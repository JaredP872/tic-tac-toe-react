// This line imports React and StrictMode from the react package, and createRoot from the react-dom/client package.
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// This line imports the styles.css file.
import "./styles.css";

// This line imports the App component from the App.js file.
import App from "./App";

// This line creates a root element and renders the App component inside a StrictMode element.
const root = createRoot(document.getElementById("root"));

// This line renders the App component inside a StrictMode element.
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);