import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import ProjectsPage from './pages/ProjectsPage';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

function RedirectIfAuthenticated({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/projects" replace />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/auth"
          element={(
            <RedirectIfAuthenticated>
              <AuthPage />
            </RedirectIfAuthenticated>
          )}
        />
        <Route
          path="/projects"
          element={(
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          )}
        />
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
