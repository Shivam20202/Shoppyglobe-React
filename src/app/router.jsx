import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";

const ProductList = lazy(() => import("../components/ProductList"));
const ProductDetail = lazy(() => import("../components/ProductDetail"));
const Cart = lazy(() => import("../components/Cart"));
const Checkout = lazy(() => import("../components/Checkout"));
const NotFound = lazy(() => import("../components/NotFound"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);