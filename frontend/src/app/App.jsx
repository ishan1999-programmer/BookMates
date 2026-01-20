import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login.jsx";
import ProtectedRoute from "../components/common/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
