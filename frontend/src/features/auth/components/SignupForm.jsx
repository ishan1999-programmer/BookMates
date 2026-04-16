import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
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
import useSignup from "../hooks/useSignup";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import useLogin from "../hooks/useLogin";
import useGoogleLogin from "../hooks/useGoogleLogin";
import { FcGoogle } from "react-icons/fc";

const SignupForm = () => {
  const { isSubmitting, signup } = useSignup();
  const { isSubmitting: isGoogleSubmitting, googleLogin } = useGoogleLogin();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (formData) => {
    try {
      delete formData.confirmPassword;
      await signup(formData);
      navigate("/login", { replace: true, state: { signupSuccess: true } });
    } catch (error) {
      setError("root", {
        message: error?.message || "Signup failed. Please try again.",
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
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Start your journey with fellow readers
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                type="fullname"
                placeholder="Enter your full name"
                {...register("fullname", {
                  required: "Full Name is required",
                  minLength: {
                    value: 3,
                    message: "Full name must be at least 3 characters long",
                  },
                })}
              />
              {errors.fullname && (
                <p className="text-sm text-red-500">
                  {errors.fullname?.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Create a username"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Username must be at most 20 characters long",
                  },
                  pattern: {
                    value: /^(?!.*@.*@)[a-zA-Z0-9_@]+$/,
                    message:
                      "Username can contain letters, numbers, underscores, and at most one @",
                  },
                })}
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username?.message}
                </p>
              )}
            </div>
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
                  placeholder="Create a password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain at least 8 characters, including one letter and one number.",
                    },
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
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <InputGroup>
                <InputGroupInput
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("confirmPassword", {
                    required: "Confirm your password",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                />
                <InputGroupAddon
                  align="inline-end"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="cursor-pointer"
                >
                  {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
                </InputGroupAddon>
              </InputGroup>

              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
          </div>
          <p className="text-sm text-red-500 text-center mt-2">
            {errors.root?.message}
          </p>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "Create Account"}
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
          <div className="footer-links-signup-form">
            <p>
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignupForm;
