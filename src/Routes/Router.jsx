import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import AllTickets from "../Pages/Other/AllTickets";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Vendor from "../Pages/Other/Vendor";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-tickets",
        element: <AllTickets />,
      },
      {
        path: "/dashboard",
        element: <Home />,
      },
      {
        path: "/vendor",
        element: <PrivateRoute>
            <Vendor/>
        </PrivateRoute>
      },
    ],
  },
  // ---------------------------------------------------------
  // AUTH ROUTES
  // ---------------------------------------------------------
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
