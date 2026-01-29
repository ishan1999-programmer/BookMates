import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "../styles/auth.css";
import { login } from "../apis/auth.api";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const [isLoginFormSubmitting, setIsLoginFormSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const handleLoginFormSubmit = async (formData) => {
    try {
      setIsLoginFormSubmitting(true);
      const loginResponse = await login(formData);
      const accessToken = loginResponse.data.data.token;
      localStorage.setItem("accessToken", accessToken);
      navigate("/feed");
    } catch (error) {
      setError("root", { message: error?.message });
    } finally {
      setIsLoginFormSubmitting(false);
    }
  };

  useEffect(() => {
    if (location.state?.signupSuccess) {
      toast.success("Account created successfully. Please log in.", {
        position: "top-center",
      });
    }
  }, [location.state]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your reading community
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleLoginFormSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email?.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one letter and one number",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>
          </div>
          <p className="text-sm text-red-500 text-center mt-2">
            {errors.root?.message}
          </p>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            disabled={isLoginFormSubmitting}
          >
            {isLoginFormSubmitting ? <Spinner /> : "Sign In"}
          </Button>
          <Button variant="outline" className="w-full">
            Sign In with Google
          </Button>
          <div className="footer-links-login-form">
            <a href="">Forgot your password?</a>
            <p>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
