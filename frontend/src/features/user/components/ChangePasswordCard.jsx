import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ChangePasswordCard = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Change Password
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form>
          <div>
            <Input
              id="currentPassword"
              type="password"
              placeholder="Current password"
              {...register("currentPassword", {
                required: "Current Password is required",
              })}
              className="p-5"
            />
            {errors.currentPassword && (
              <p className="text-sm text-red-500">
                {errors.currentPassword?.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <Input
              id="newPassword"
              type="password"
              placeholder="New password"
              {...register("newPassword", {
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
              className="p-5"
            />
            {errors.newPassword && (
              <p className="text-sm text-red-500">
                {errors.newPassword?.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              {...register("confirmPassword", {
                required: "Confirm new password",
                validate: (value) =>
                  value === getValues("newPassword") ||
                  "Passwords do not match",
              })}
              className="p-5"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          <Button type="submit" className="mt-4">Change Password</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordCard;
