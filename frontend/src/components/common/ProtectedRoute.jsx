import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../lib/auth";

export default function ProtectedRoute() {
  const auth = isAuthenticated();

  return auth ? <Outlet /> : <Navigate to="/login" replace />;
}
