import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login.jsx";
import Feed from "../features/post/pages/Feed.jsx";
import ProtectedRoute from "../components/common/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/feed" element={<Feed />} />
      </Route>
    </Routes>
  );
}

export default App;
