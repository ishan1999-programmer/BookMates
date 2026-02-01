import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login.jsx";
import Signup from "../features/auth/pages/Signup.jsx";
import Feed from "../features/post/pages/Feed.jsx";
import Landing from "../features/landing/pages/Landing.jsx";
import ProtectedRoute from "../components/common/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Landing />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/feed" element={<Feed />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
