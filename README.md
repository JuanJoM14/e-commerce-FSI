# 🛍️ E-Commerce con Stripe Checkout

Este es un proyecto de e-commerce desarrollado como parte del laboratorio de Fundamentos de Sistemas Informáticos (FSI). Permite listar productos desde Stripe, agregarlos a un carrito, simular pagos mediante Stripe Checkout y registrar un historial de compras.

---

## 🚀 Tecnologías utilizadas

- **Next.js 13 (App Router)**
- **React**
- **Tailwind CSS**
- **Stripe API (modo prueba)**
- **Context API y localStorage**

---

## 📦 Funcionalidades

✅ Listado de productos desde Stripe  
✅ Carrito de compras persistente  
✅ Checkout con Stripe (modo prueba)  
✅ Página de éxito (`/success`) con resumen de compra  
✅ Historial de compras con fecha  
✅ Limpieza del carrito solo tras ver el resumen  
✅ Interfaz clara y organizada con Tailwind CSS  



## 🚀 Pasos para ejecutar el proyecto en local

1. **Clonar el repositorio**

```bash
git clone https://github.com/JuanJoM14/e-commerce-FSI.git
cd e-commerce-FSI
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Crear archivo de configuración**

crea un archivo llamado `.env.local` en la raíz del proyecto y agrega lo siguiente:

```env
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_tu_clave_publica
```

> 🔐 Reemplaza las claves por tus propias credenciales desde [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)

4. **Iniciar el servidor de desarrollo**

```bash
npm run dev
```

5. **Abrir el navegador**

Abre [http://localhost:3000/pricing](http://localhost:3000/pricing) para ver el proyecto funcionando.
