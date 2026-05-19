import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { Provider } from "react-redux";
import { store } from "./store";
import { AuthInitializer } from "./components/Auth/AuthInitializer";
import { getRouter } from "./router";
import "./styles.css";

import { InquiryProvider } from "./context/InquiryContext";

const router = getRouter();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthInitializer>
        <InquiryProvider>
          <RouterProvider router={router} />
        </InquiryProvider>
      </AuthInitializer>
    </Provider>
  </React.StrictMode>,
);
