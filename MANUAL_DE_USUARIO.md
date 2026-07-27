# Manual de Usuario - MMGlass C.A. Sistema de Inventario

¡Bienvenido al manual de uso del Sistema de Inventario de MMGlass C.A.! Este documento te guiará paso a paso sobre cómo utilizar todas las funcionalidades de la plataforma.

---

## Índice
1. [Acceso al Sistema (Login)](#1-acceso-al-sistema)
2. [Roles de Usuario](#2-roles-de-usuario)
3. [Módulo: Dashboard](#3-módulo-dashboard)
4. [Añadir y Restar Unidades (Restock)](#4-añadir-y-restar-unidades)
5. [Módulo: Agregar Producto (Solo Administradores)](#5-módulo-agregar-producto)
6. [Módulo: Registros (Historial)](#6-módulo-registros)
7. [Módulo: Gestión de Usuarios (Solo Administradores)](#7-módulo-gestión-de-usuarios)

---

## 1. Acceso al Sistema
Para ingresar al sistema, necesitas una cuenta previamente registrada por el gerente en la base de datos de la empresa.
- **Paso 1:** Ingresa al enlace proporcionado por la empresa.
- **Paso 2:** En la pantalla de inicio de sesión, introduce tu correo electrónico institucional o asignado, y tu contraseña.
- **Paso 3:** Presiona "Iniciar Sesión".

---

## 2. Roles de Usuario
El sistema protege la información basándose en el tipo de empleado que inicia sesión:
- **Usuario (Solo lectura):** Puede ver el panel principal, buscar productos, revisar las cantidades en tiempo real y ver el historial de movimientos. Ideal para empleados de mostrador o consulta rápida.
- **Administrador (Acceso Total):** Tiene todas las funcionalidades de un Usuario, pero además puede agregar productos nuevos, editar nombres/detalles, sumar o restar cantidades al inventario (restock), eliminar artículos y otorgar permisos a otros empleados.

---

## 3. Módulo: Dashboard
Es la pantalla principal que verás al entrar. Aquí tienes un vistazo general de cómo se encuentra el almacén.
- **Tarjetas de Resumen:** Arriba verás cuatro tarjetas numéricas que te indican el total de productos únicos, el total de unidades físicas en la empresa, cuántos productos tienen stock bajo y cuántos movimientos se han hecho en el día.
- **Buscador (Parte superior derecha):** Te permite escribir el nombre de un material (ej. "Silicona") para filtrar la lista instantáneamente.
- **Filtros rápidos:** Botones redondos para filtrar entre "Todos", "Bajo" (cuando quedan pocas unidades), "Normal" y "Alto".
- **Tarjetas de Productos:** Cada producto muestra su categoría, si su stock está en verde (bien), naranja (bajo) o rojo (agotado).

---

## 4. Añadir y Restar Unidades
Si eres Administrador, verás botones dentro de la tarjeta de cada producto en el Dashboard.

### Cómo actualizar el número de unidades:
1. En la tarjeta de un producto, ubica los números grandes en el centro.
2. A los lados verás el botón **`-`** (para restar por uso/venta) y el botón **`+`** (para sumar por nueva compra al proveedor).
3. Haz clic en el símbolo correspondiente y las cantidades se actualizarán de forma inmediata.
4. Estas sumas y restas quedan registradas automáticamente en el "Historial de Movimientos" con tu nombre, fecha y hora.

### Otras opciones en la tarjeta:
- **Botón "Editar" (Lápiz):** Te permite cambiar el nombre del producto, la categoría o el límite mínimo de alerta.
- **Botón "Eliminar" (Papelera roja):** Borra permanentemente el producto del catálogo.

---

## 5. Módulo: Agregar Producto
*(Exclusivo para Administradores)*

Esta pestaña en el menú izquierdo te permite registrar materiales nuevos en el catálogo:
1. Navega a **Agregar**.
2. **Si es un producto nuevo:** Rellena el nombre, la cantidad que tienes actualmente en físico, su categoría (Aluminio, Acero, etc.) y un límite mínimo (cuando la cantidad llegue a ese número, el sistema lanzará alerta de stock bajo).
3. **Si es un "Restock" masivo:** Puedes usar la pestaña superior para buscar un producto que ya existe y sumarle cantidades de forma rápida añadiendo notas como el número de factura o nombre del proveedor.

---

## 6. Módulo: Registros
Es el libro de contabilidad automático de la empresa. 
- Muestra una tabla con **todo lo que ha pasado en el sistema**.
- Cada vez que se suma un producto, se resta, se borra o se crea uno nuevo, el sistema escribe una línea aquí indicando qué pasó, cuándo pasó y las cantidades exactas del antes y del después.
- Puedes usar los filtros superiores para ver solo "Entradas", solo "Salidas" o solo "Ediciones".

---

## 7. Módulo: Gestión de Usuarios
*(Exclusivo para Administradores)*

En esta pestaña puedes promover o degradar los niveles de acceso de tus empleados.

- **Para dar poder de Administrador a un empleado:** Busca su correo en la lista y presiona el botón **Hacer Admin**. A partir de ese momento él verá los botones de edición.
- **Para crear un usuario nuevo:** Debes acceder al panel de control de Supabase (la base de datos), ir a "Authentication" -> "Users" -> "Add User". Todo usuario que crees allá, entrará a la aplicación automáticamente con rol de "Usuario" (lectura), para que tú decidas luego desde la aplicación web si quieres hacerlo Admin o no.

---
*MMGlass C.A. - Desarrollado y configurado en 2026*
