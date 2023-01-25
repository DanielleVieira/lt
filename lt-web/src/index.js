import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/AuthProvider";
import { ToastProvider } from "./contexts/ToastProvider ";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);
