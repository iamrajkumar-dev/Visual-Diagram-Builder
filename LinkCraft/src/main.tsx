import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./context/authContext.tsx";
import { ToastProvider } from "./components/ToastProvider.tsx";
import { ModeProvider } from "./context/modeContext.tsx";
import { ThemeProvider } from "./context/themeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <ModeProvider>
          <ThemeProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ThemeProvider>
        </ModeProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
