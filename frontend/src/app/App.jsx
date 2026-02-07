import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login.jsx";
import Signup from "../features/auth/pages/Signup.jsx";
import Feed from "../features/post/pages/Feed.jsx";
import Landing from "../features/landing/pages/Landing.jsx";
import Settings from "@/features/user/pages/Settings.jsx";
import Profile from "@/features/user/pages/Profile.jsx";
import AddPost from "@/features/post/pages/AddPost.jsx";
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
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users/:userId" element={<Profile />} />
          <Route path="/add-post" element={<AddPost />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
