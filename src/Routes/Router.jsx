import { createBrowserRouter } from "react-router";

// ================== ROUTE GUARDS ==================
import PrivateRoute from "../Routes/PrivateRoute";
import AdminRoute from "../Routes/AdminRoute";
import VendorRoute from "../Routes/VendorRoute";
import UserRoute from "../Routes/UserRoute";

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

// ----- Payments -----
import PaymentSuccess from "../Pages/Payments/PaymentSuccess";
import PaymentCancelled from "../Pages/Payments/PaymentCancelled";
import PaymentFailed from "../Pages/Payments/PaymentFailed";

// ----- Admin -----
import AdminProfile from "../Pages/Dashboard/AdminDashboard/AdminProfile";
import ManageTickets from "../Pages/Dashboard/AdminDashboard/ManageTickets";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers";
import AdvertiseTickets from "../Pages/Dashboard/AdminDashboard/AdvertiseTickets";

// ----- User -----
import UserProfile from "../Pages/Dashboard/UserDashBoard/UserProfile";
import MyBookedTickets from "../Pages/Dashboard/UserDashBoard/MyBookedTickets";
import Transaction from "../Pages/Dashboard/UserDashBoard/Transaction";

// ----- Vendor -----
import VendorProfile from "../Pages/Dashboard/VendorDashboard/VendorProfile";
import AddTicket from "../Pages/Dashboard/VendorDashboard/AddTicket";
import MyAddedTickets from "../Pages/Dashboard/VendorDashboard/MyAddedTickets";
import RequestedBookings from "../Pages/Dashboard/VendorDashboard/RequestedBookings";
import Revenue from "../Pages/Dashboard/VendorDashboard/Revenue";

// ----- Other -----
import About from "../Pages/Other/About";
import ContactUs from "../Pages/Other/ContactUs";
import ErrorPage from "../Pages/Other/ErrorPage";
import NavProfile from "../Pages/Other/NavProfile";

// ================== ROUTER ==================

export const router = createBrowserRouter([
  // -------------------------------------------------
  // PUBLIC ROUTES
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
        element: (
          <PrivateRoute>
            <AllTickets />
          </PrivateRoute>
        ),
      },
      {
        path: "ticket-details/:id",
        element: (
          <PrivateRoute>
            <TicketDetails />
          </PrivateRoute>
        ),
      },

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
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: 'nav-profile',
        element: <NavProfile/>
      }
    ],
  },

  // -------------------------------------------------
  // AUTH ROUTES
  // -------------------------------------------------
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // -------------------------------------------------
  // DASHBOARD (PROTECTED)
  // -------------------------------------------------
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // ===== ADMIN =====
      {
        path: "admin/profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-tickets",
        element: (
          <AdminRoute>
            <ManageTickets />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin/advertise-tickets",
        element: (
          <AdminRoute>
            <AdvertiseTickets />
          </AdminRoute>
        ),
      },

      // ===== USER =====
      {
        path: "user/profile",
        element: (
          <UserRoute>
            <UserProfile />
          </UserRoute>
        ),
      },
      {
        path: "user/my-booked-tickets",
        element: (
          <UserRoute>
            <MyBookedTickets />
          </UserRoute>
        ),
      },
      {
        path: "user/transactions",
        element: (
          <UserRoute>
            <Transaction />
          </UserRoute>
        ),
      },

      // ===== VENDOR =====
      {
        path: "vendor/profile",
        element: (
          <VendorRoute>
            <VendorProfile />
          </VendorRoute>
        ),
      },
      {
        path: "vendor/add-ticket",
        element: (
          <VendorRoute>
            <AddTicket />
          </VendorRoute>
        ),
      },
      {
        path: "vendor/my-added-tickets",
        element: (
          <VendorRoute>
            <MyAddedTickets />
          </VendorRoute>
        ),
      },
      {
        path: "vendor/requested-bookings",
        element: (
          <VendorRoute>
            <RequestedBookings />
          </VendorRoute>
        ),
      },
      {
        path: "vendor/revenue",
        element: (
          <VendorRoute>
            <Revenue />
          </VendorRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);
