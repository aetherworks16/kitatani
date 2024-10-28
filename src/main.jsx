import React from "react";
import { createRoot } from "react-dom/client";
import Dashboard from "./pages/dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Information from "./pages/information";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/information/:name",
    element: <Information />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);