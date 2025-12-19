import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Router.jsx";
import AuthProvider from "./Contexts/AuthProvider.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./Contexts/ThemeProvider.jsx";
import { Toaster } from "react-hot-toast";

<Toaster position="top-center" reverseOrder={false} />

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

