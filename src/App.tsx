import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Organizations from "./pages/Organizations";
import Socios from "./pages/Socios";
import Eventos from "./pages/Eventos";
import Foros from "./pages/Foros";
import Configuracion from "./pages/Configuracion";
import Mensajes from "./pages/Mensajes";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/organizations"
        element={
          <ProtectedRoute>
            <Organizations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/socios"
        element={
          <ProtectedRoute>
            <Socios />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos"
        element={
          <ProtectedRoute>
            <Eventos />
          </ProtectedRoute>
        }
      />
      <Route path="/proyectos" element={<Navigate to="/eventos" replace />} />
      <Route
        path="/mensajes"
        element={
          <ProtectedRoute>
            <Mensajes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/foros"
        element={
          <ProtectedRoute>
            <Foros />
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuracion"
        element={
          <ProtectedRoute>
            <Configuracion />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
