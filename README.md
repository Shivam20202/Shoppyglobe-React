# ShoppyGlobe — E-commerce Site

A modern and responsive e-commerce application built with **React + Vite + Tailwind CSS**, using **Redux Toolkit** for state management and **React Router (createBrowserRouter)** for dynamic routing. The application features lazy-loaded routes, cart persistence with localStorage, toast notifications, and a clean modular architecture.

> 🔗 **GitHub Repository:** (https://github.com/Shivam20202/Shoppyglobe-React) 

  🔗 **Deployed Link:**  (https://react-shoppyglobe.vercel.app/)
  
---

# ✨ Features

* 🛍️ Product catalog fetched from DummyJSON API
* 🔎 Live product search powered by Redux state
* 📦 Dynamic product details page (`/product/:id`)
* 🛒 Add, remove, and update cart items
* 💾 Cart data persisted using Local Storage
* 💳 Checkout page with dummy order placement flow
* 🔔 Toast notifications using Sonner
* 🚫 Custom 404 Not Found page
* ⚡ Route-based code splitting using React.lazy & Suspense
* 🖼️ Lazy-loaded product images
* 📱 Fully responsive design for mobile, tablet, and desktop
* 🎨 Modern UI built with Tailwind CSS
* 🔄 Redux-powered global state management

---

# 🧱 Project Structure

```bash
src/
├── app/
│   ├── router.jsx          # Application routing configuration
│   └── Layout.jsx          # Shared layout component
│
├── components/
│   ├── Header.jsx
│   ├── ProductList.jsx
│   ├── ProductItem.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── CartItem.jsx
│   ├── Checkout.jsx
│   ├── NotFound.jsx
│   └── PageFallback.jsx
│
├── hooks/
│   └── useProducts.js      # Custom hook for product fetching
│
├── redux/
│   ├── store.js
│   ├── cartSlice.js
│   └── searchSlice.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# 🚀 Getting Started

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:5173
```

---

## Production Build

```bash
npm run build
npm run preview
```

---

# 🗺️ Application Routes

| Route          | Description               |
| -------------- | ------------------------- |
| `/`            | Product Listing Page      |
| `/product/:id` | Product Detail Page       |
| `/cart`        | Shopping Cart             |
| `/checkout`    | Checkout Page             |
| `*`            | Custom 404 Not Found Page |

---

# 🧠 State Management (Redux Toolkit)

### Cart Slice

Handles:

* Add products to cart
* Remove products from cart
* Increase quantity
* Decrease quantity
* Clear cart after order placement
* Calculate cart totals

### Search Slice

Handles:

* Global search query state
* Product filtering functionality

---

# 💾 Local Storage Persistence

To improve user experience, cart data is automatically stored in **localStorage**.

Benefits:

* Cart items remain available after page refresh
* User does not lose cart contents accidentally
* State is restored automatically when the application loads

---

# 🌐 Data Fetching

### Product List

The custom hook `useProducts()`:

* Fetches products from:

```bash
https://dummyjson.com/products
```

* Uses React's `useEffect`
* Handles loading state
* Handles error state gracefully

### Product Details

Fetches product information dynamically using:

```bash
https://dummyjson.com/products/:id
```

based on route parameters.

---

# ⚡ Performance Optimizations

Implemented:

* React.lazy()
* Suspense
* Route-based code splitting
* Lazy-loaded images
* Reusable loading spinner component
* Optimized Redux state updates

---

# 🔔 Notifications

The application uses **Sonner Toast Notifications** for:

* Product added to cart
* Product removed from cart
* Order placed successfully
* Important user actions

---

# 🎨 Styling & UI

Built using:

* Tailwind CSS
* Responsive layouts
* Modern product cards
* Sticky navigation header
* Smooth hover effects
* Clean spacing and typography
* Mobile-first design

---

# 🛠️ Technologies Used

* React
* Vite
* Redux Toolkit
* React Redux
* React Router DOM
* Tailwind CSS
* Lucide React
* Sonner
* JavaScript (ES6+)

---


# 📜 License

Created for educational purposes as part of the Project Assignment.
