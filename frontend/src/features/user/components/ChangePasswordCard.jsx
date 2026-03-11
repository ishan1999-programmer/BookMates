import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import useUpdateUserPassword from "../hooks/useUpdateUserPassword";

const ChangePasswordCard = () => {
  const { isSubmitting, updateUserPassword } = useUpdateUserPassword();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const { currentPassword, newPassword } = formData;
      await updateUserPassword({ currentPassword, newPassword });
      toast.success("Password updated successfully", {
        position: "top-center",
      });
      reset();
    } catch (error) {
      setError("root", {
        message:
          error?.message || "Updating password failed. Please try again.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Change Password
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least 8 characters, including one letter and one number.",
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
          <p className="text-sm text-red-500 text-center mt-2">
            {errors.root?.message}
          </p>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-[150px]"
            >
              {isSubmitting ? <Spinner /> : "Change Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordCard;
