import LoginForm from "../components/LoginForm";
import { BookOpen } from "lucide-react";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-page-title">
        <BookOpen className="h-12 w-12 text-primary" />
        <h1>BookMates</h1>
        <p>Welcome back, fellow reader!</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
