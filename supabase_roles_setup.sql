-- ════════════════════════════════════════════════════════
--  MMGlass C.A — Supabase Roles Setup
--  Ejecuta este script en el SQL Editor de tu proyecto Supabase
-- ════════════════════════════════════════════════════════

-- 1. Crear tabla de perfiles (roles)
CREATE TABLE IF NOT EXISTS public.perfiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  rol TEXT NOT NULL DEFAULT 'usuario' CHECK (rol IN ('admin', 'usuario')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar RLS en perfiles
ALTER TABLE public.perfiles ENABLE ROW LEVEL SECURITY;

-- 3. Políticas para perfiles
-- Los usuarios pueden leer su propio perfil
CREATE POLICY "Permitir a los usuarios leer su propio perfil" 
ON public.perfiles FOR SELECT 
USING ( auth.uid() = id );

-- Los admins pueden leer todos los perfiles
CREATE POLICY "Admins pueden ver todos los perfiles" 
ON public.perfiles FOR SELECT 
USING ( (SELECT rol FROM public.perfiles WHERE id = auth.uid()) = 'admin' );

-- Los admins pueden actualizar perfiles
CREATE POLICY "Admins pueden actualizar perfiles" 
ON public.perfiles FOR UPDATE 
USING ( (SELECT rol FROM public.perfiles WHERE id = auth.uid()) = 'admin' );

-- 4. Trigger para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.perfiles (id, email, rol)
  VALUES (new.id, new.email, 'usuario');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Eliminar el trigger si existe para recrearlo
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Hacer que el primer usuario sea admin (Opcional: puedes ejecutar esto para tu cuenta)
-- Se asume que el correo que me diste es el que usas en la app. Si la tabla perfiles
-- está vacía porque te registraste antes del trigger, insertamos la fila manualmente:
INSERT INTO public.perfiles (id, email, rol)
SELECT id, email, 'admin' FROM auth.users WHERE email = 'juansecond22@gmail.com'
ON CONFLICT (id) DO UPDATE SET rol = 'admin';

-- 6. Actualizar políticas de seguridad para inventario
-- Eliminar las políticas anteriores si existían
DROP POLICY IF EXISTS "auth_all_productos" ON public.productos;
DROP POLICY IF EXISTS "auth_all_movimientos" ON public.movimientos;

-- Todos los autenticados pueden LEER productos y movimientos
CREATE POLICY "Usuarios pueden leer productos" ON public.productos FOR SELECT USING (true);
CREATE POLICY "Usuarios pueden leer movimientos" ON public.movimientos FOR SELECT USING (true);

-- SOLO los administradores pueden INSERTAR, ACTUALIZAR, o ELIMINAR
CREATE POLICY "Admins pueden insertar productos" ON public.productos FOR INSERT WITH CHECK ( (SELECT rol FROM public.perfiles WHERE id = auth.uid()) = 'admin' );
CREATE POLICY "Admins pueden actualizar productos" ON public.productos FOR UPDATE USING ( (SELECT rol FROM public.perfiles WHERE id = auth.uid()) = 'admin' );
CREATE POLICY "Admins pueden eliminar productos" ON public.productos FOR DELETE USING ( (SELECT rol FROM public.perfiles WHERE id = auth.uid()) = 'admin' );

CREATE POLICY "Admins pueden insertar movimientos" ON public.movimientos FOR INSERT WITH CHECK ( (SELECT rol FROM public.perfiles WHERE id = auth.uid()) = 'admin' );
CREATE POLICY "Admins pueden actualizar movimientos" ON public.movimientos FOR UPDATE USING ( (SELECT rol FROM public.perfiles WHERE id = auth.uid()) = 'admin' );
CREATE POLICY "Admins pueden eliminar movimientos" ON public.movimientos FOR DELETE USING ( (SELECT rol FROM public.perfiles WHERE id = auth.uid()) = 'admin' );
