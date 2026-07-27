# MMGlass C.A — Sistema de Inventario

Sistema de inventario web completo para MMGlass C.A, construido con **Next.js 14 + Supabase + Vercel**.
Responsivo para PC y móvil.

---

## Stack

- **Frontend**: Next.js 14 (App Router, React 18)
- **Base de datos**: Supabase (PostgreSQL)
- **Deploy**: Vercel
- **Estilos**: CSS Vanilla (dark premium)

---

## 🚀 Guía de Instalación y Deploy

### Paso 1 — Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta gratuita
2. Crea un **nuevo proyecto** (elige una región cercana, ej: `us-east-1`)
3. Espera que el proyecto se inicialice (~1 minuto)
4. Ve a **SQL Editor** en el panel izquierdo
5. Pega el contenido de `supabase_setup.sql` y haz clic en **Run**
6. Ve a **Project Settings → API** y copia:
   - `Project URL` → este es tu `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → este es tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Paso 2 — Variables de entorno locales

```bash
# Copia el archivo de ejemplo
cp .env.local.example .env.local
```

Edita `.env.local` con tus credenciales de Supabase:
```
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

### Paso 3 — Instalar dependencias y correr local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### Paso 4 — Subir a GitHub

```bash
git init
git add .
git commit -m "feat: MMGlass inventario system"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/mmglass-inventario.git
git push -u origin main
```

### Paso 5 — Deploy en Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta (gratis)
2. Haz clic en **"Add New Project"**
3. Importa tu repositorio de GitHub
4. En **"Environment Variables"**, agrega:
   - `NEXT_PUBLIC_SUPABASE_URL` = tu URL de Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = tu anon key
5. Haz clic en **"Deploy"** ✓

¡En ~2 minutos tendrás tu URL pública!

---

## Funcionalidades

### Dashboard
- Cards con nombre grande del producto y cantidad prominente
- Botones `+` / `−` para ajuste manual instantáneo
- Indicador de stock: Alto / Normal / Bajo / Sin Stock
- Stats: total productos, unidades, stock bajo, movimientos del día
- Buscador y filtros por nivel de stock
- Botón Editar (abre modal completo)
- Botón Eliminar con confirmación

### Registros
- Tabla completa de todos los movimientos
- Tipos: Entrada, Salida, Nuevo, Eliminado, Edición
- Filtro por tipo de movimiento
- Resumen de conteos
- Opción de limpiar historial

### Agregar Producto
- Toggle: **Producto Nuevo** vs **Restock**
- Restock: selector de productos actuales con preview de stock actual → nuevo total
- Categorías: Cristal, Aluminio, Acero Inoxidable, Herrajes, Selladores, Herramientas
- Unidades: unidades, m², metros, kg, láminas, barras, rollos, piezas

---

## Estructura del proyecto

```
├── app/
│   ├── layout.js         ← Layout raíz con tipografía Inter
│   ├── page.js           ← Página principal (estado global)
│   └── globals.css       ← Sistema de diseño completo
├── components/
│   ├── Toast.js          ← Notificaciones toast (React context)
│   ├── Sidebar.js        ← Sidebar desktop + nav móvil
│   ├── Dashboard.js      ← Grid de productos + stats
│   ├── ProductCard.js    ← Card individual con controles
│   ├── Registros.js      ← Tabla de historial
│   ├── AgregarProducto.js← Formularios nuevo/restock
│   ├── EditModal.js      ← Modal de edición
│   └── DeleteModal.js    ← Modal de confirmación borrado
├── lib/
│   ├── supabase.js       ← Cliente Supabase
│   └── db.js             ← Operaciones de base de datos
├── public/
│   └── mmglass_logo.jpeg ← Logo de la empresa
├── supabase_setup.sql    ← Script de creación de tablas
└── .env.local.example    ← Plantilla de variables de entorno
```

---

## Variables de entorno requeridas

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima pública de Supabase |
