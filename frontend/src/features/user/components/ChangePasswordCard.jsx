import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import useUpdateUserPassword from "../hooks/useUpdateUserPassword";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeOffIcon, EyeIcon } from "lucide-react";

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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            <InputGroup>
              <InputGroupInput
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Current password"
                {...register("currentPassword", {
                  required: "Current Password is required",
                })}
                className="p-5"
              />
              <InputGroupAddon
                align="inline-end"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showCurrentPassword ? <EyeIcon /> : <EyeOffIcon />}
              </InputGroupAddon>
            </InputGroup>

            {errors.currentPassword && (
              <p className="text-sm text-red-500">
                {errors.currentPassword?.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <InputGroup>
              <InputGroupInput
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
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
              <InputGroupAddon
                align="inline-end"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showNewPassword ? <EyeIcon /> : <EyeOffIcon />}
              </InputGroupAddon>
            </InputGroup>

            {errors.newPassword && (
              <p className="text-sm text-red-500">
                {errors.newPassword?.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <InputGroup>
              <InputGroupInput
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                {...register("confirmPassword", {
                  required: "Confirm new password",
                  validate: (value) =>
                    value === getValues("newPassword") ||
                    "Passwords do not match",
                })}
                className="p-5"
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
