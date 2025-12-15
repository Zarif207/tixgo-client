import React from "react";
import { createBrowserRouter } from "react-router";

// ================== LAYOUTS ==================
import RootLayout from "../Layouts/RootLayout";
import AuthLayout from "../Layouts/AuthLayout";
import DashboardLayout from "../Layouts/DashboardLayout";

// ================== PAGES ==================

// ----- Home / Public -----
import Home from "../Pages/Home/Home";
import AllTickets from "../Pages/Other/AllTickets";
import TicketDetails from "../Pages/Other/TicketDetails";

// ----- Auth -----
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";

// ----- Payments (GLOBAL) -----
import PaymentSuccess from "../Pages/Payments/PaymentSuccess";
import PaymentCancelled from "../Pages/Payments/PaymentCancelled";
import PaymentFailed from "../Pages/Payments/PaymentFailed";

// ----- Admin Dashboard -----
import AdminProfile from "../Pages/Dashboard/AdminDashboard/AdminProfile";
import ManageTickets from "../Pages/Dashboard/AdminDashboard/ManageTickets";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers";
import AdvertiseTickets from "../Pages/Dashboard/AdminDashboard/AdvertiseTickets";

// ----- User Dashboard -----
import UserProfile from "../Pages/Dashboard/UserDashBoard/UserProfile";
import MyBookedTickets from "../Pages/Dashboard/UserDashBoard/MyBookedTickets";
import Transaction from "../Pages/Dashboard/UserDashBoard/Transaction";

// ----- Vendor Dashboard -----
import VendorProfile from "../Pages/Dashboard/VendorDashboard/VendorProfile";
import AddTicket from "../Pages/Dashboard/VendorDashboard/AddTicket";
import MyAddedTickets from "../Pages/Dashboard/VendorDashboard/MyAddedTickets";
import RequestedBookings from "../Pages/Dashboard/VendorDashboard/RequestedBookings";
import Revenue from "../Pages/Dashboard/VendorDashboard/Revenue";

// ================== ROUTER ==================

export const router = createBrowserRouter([
  // -------------------------------------------------
  // ROOT (PUBLIC + PAYMENT)
  // -------------------------------------------------
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-tickets",
        element: <AllTickets />,
      },
      {
        path: "ticket-details/:id",
        element: <TicketDetails />,
      },

      // ✅ PAYMENT ROUTES (STRIPE REDIRECTS HERE)
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled />,
      },
      {
        path: "payment-failed",
        element: <PaymentFailed />,
      },
    ],
  },

  // -------------------------------------------------
  // AUTH ROUTES
  // -------------------------------------------------
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

  // -------------------------------------------------
  // DASHBOARD ROUTES
  // -------------------------------------------------
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // ===== ADMIN =====
      {
        path: "admin/profile",
        element: <AdminProfile />,
      },
      {
        path: "admin/manage-tickets",
        element: <ManageTickets />,
      },
      {
        path: "admin/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "admin/advertise-tickets",
        element: <AdvertiseTickets />,
      },

      // ===== USER =====
      {
        path: "user/profile",
        element: <UserProfile />,
      },
      {
        path: "user/my-booked-tickets",
        element: <MyBookedTickets />,
      },
      {
        path: "user/transactions",
        element: <Transaction />,
      },

      // ===== VENDOR =====
      {
        path: "vendor/profile",
        element: <VendorProfile />,
      },
      {
        path: "vendor/add-ticket",
        element: <AddTicket />,
      },
      {
        path: "vendor/my-added-tickets",
        element: <MyAddedTickets />,
      },
      {
        path: "vendor/requested-bookings",
        element: <RequestedBookings />,
      },
      {
        path: "vendor/revenue",
        element: <Revenue />,
      },
    ],
  },
]);