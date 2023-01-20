import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "../src/styles/globals.css";
import "./libs/dayjs";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
