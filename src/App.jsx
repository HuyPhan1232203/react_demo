import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import Dashboard from "./components/dashboard";
import ManageCategory from "./pages/admin/manage-category";
import ManageStore from "./pages/admin/manage-store";
import ManageServiceGroup from "./pages/admin/manage-store-group";
import Test from "./pages/test";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Layout from "./components/layout";
import CartPage from "./pages/cart/cart";

function App() {
  const ProtectRouteAuth = ({ children }) => {
    const user = useSelector((store) => store.user);
    console.log(user);

    if (user && user?.role === "ADMIN") {
      return children;
    }
    toast.error("You are not allowed to access this!");
    return <Navigate to={"/login"} />;
  };

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
      ],
    },

    {
      path: "test",
      element: <Test />,
    },

    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "cart",
      element: <CartPage />,
    },

    {
      path: "register",
      element: <RegisterPage />,
    },

    {
      path: "dashboard",
      element: (
        <ProtectRouteAuth>
          <Dashboard />
        </ProtectRouteAuth>
      ),
      children: [
        {
          path: "category",
          element: <ManageCategory />,
        },
        {
          path: "store",
          element: <ManageStore />,
        },
        {
          path: "service-group",
          element: <ManageServiceGroup />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
