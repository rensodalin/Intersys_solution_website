import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

import { InquiryProvider } from "./context/InquiryContext";

const router = getRouter();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <InquiryProvider>
      <RouterProvider router={router} />
    </InquiryProvider>
  </React.StrictMode>,
);
