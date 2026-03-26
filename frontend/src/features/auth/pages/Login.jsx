import LoginForm from "../components/LoginForm";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.signupSuccess) {
      toast.success("Account created successfully. Please log in.", {
        position: "top-center",
      });
    }
  }, [location.state?.signupSuccess]);

  useEffect(() => {
    const sessionExpired = localStorage.getItem("sessionExpired");

    if (sessionExpired) {
      setTimeout(() => {
        toast.error("Session expired. Please login again.", {
          position: "top-center",
        });
      }, 100);

      localStorage.removeItem("sessionExpired");
    }
  }, []);

  return (
    <div className="login-page">
      <div className="login-page-content">
        <div className="login-page-title">
          <BookOpen className="h-12 w-12 text-primary" />
          <h1>BookMates</h1>
          <p>Welcome back, fellow reader!</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
