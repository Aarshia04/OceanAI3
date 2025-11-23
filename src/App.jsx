import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProjectEditorPage from './pages/ProjectEditorPage.jsx';

const AppShell = ({ children }) => (
  <div className="app-shell">
    <aside className="sidebar">
      <h2>OceanAI</h2>
      <nav>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>
    </aside>
    <main className="content">{children}</main>
  </div>
);

const App = () => (
  <AppShell>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/project/:projectId" element={<ProjectEditorPage />} />
    </Routes>
  </AppShell>
);

export default App;
