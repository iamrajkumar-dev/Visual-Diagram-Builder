import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/header.css";
import "./styles/components.css";
import "./styles/auth.css";
import "./styles/pages.css";
import "./styles/diagram.css";
import DiagramEditorPage from "./pages/DiagramEditorPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["Editor"]} />}>
          <Route path="/editor/:diagramId" element={<DiagramEditorPage />} />
          <Route path="/editor/new" element={<DiagramEditorPage />} />
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
};

export default App;
