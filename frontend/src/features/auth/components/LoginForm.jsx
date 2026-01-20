import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  //   CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "../styles/auth.css";

const LoginForm = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your reading community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleLoginSubmit(e)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Sign In
        </Button>
        <Button variant="outline" className="w-full">
          Sign In with Google
        </Button>
        <div className="footer-links-login-form">
          <a href="">Forgot your password?</a>
          <p>
            Don't have an account? <a href="">Sign up</a>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
