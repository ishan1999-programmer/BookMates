import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
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
import { useEffect, useState } from "react";
import useLogin from "../hooks/useLogin";
import useGoogleLogin from "../hooks/useGoogleLogin";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const { isSubmitting, login } = useLogin();
  const { isSubmitting: isGoogleSubmitting, googleLogin } = useGoogleLogin();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const { token, userDetails } = await login(formData);
      localStorage.setItem("accessToken", token);
      localStorage.setItem("username", userDetails.username);
      navigate("/feed");
    } catch (error) {
      setError("root", {
        message: error?.message || "Login failed. Please try again.",
      });
    }
  };

  const onGoogleSubmit = async (credentialResponse) => {
    try {
      const { token, userDetails } = await googleLogin(
        credentialResponse.credential,
      );
      localStorage.setItem("accessToken", token);
      localStorage.setItem("username", userDetails.username);
      navigate("/feed");
    } catch (error) {
      setError("root", { message: "Login failed. Please try again." });
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your reading community
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <InputGroup>
                <InputGroupInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <InputGroupAddon
                  align="inline-end"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="cursor-pointer"
                >
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </InputGroupAddon>
              </InputGroup>

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
            disabled={isSubmitting || isGoogleSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Sign In"}
          </Button>
          <div className="relative w-full">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={isSubmitting || isGoogleSubmitting}
            >
              <FcGoogle className="!w-5 !h-5" />
              {isGoogleSubmitting ? "Signing in..." : "Sign in with Google"}
            </Button>

            <div
              className={`absolute inset-0 opacity-0 ${
                isSubmitting || isGoogleSubmitting ? "pointer-events-none" : ""
              }`}
            >
              <GoogleLogin
                onSuccess={onGoogleSubmit}
                onError={() =>
                  setError("root", {
                    message: "Login failed. Please try again.",
                  })
                }
              />
            </div>
          </div>
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
