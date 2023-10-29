import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Resume } from "./routes/resume/resume";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Resume />,
    },
  ],
  { basename: "/free-resume-builder/" }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
