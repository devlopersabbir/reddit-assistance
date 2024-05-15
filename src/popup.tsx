import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "./pages/Popup";
import "./index.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.body).render(
  <React.StrictMode>
    <Toaster duration={500} />
    <Popup />
  </React.StrictMode>
);
