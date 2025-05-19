// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./components/provider/auth-provider.tsx";
import { BrowserRouter as Router } from "react-router";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
  // </StrictMode>
);
