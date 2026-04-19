import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, EyeOffIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import useDeleteUser from "../hooks/useDeleteUser";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const DeleteAccountCard = () => {
  const { isSubmitting, deleteUser, error } = useDeleteUser();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
    try {
      await deleteUser({ password });
      localStorage.clear();
      navigate("/", {
        replace: true,
        state: { accountDeletionSuccess: true },
      });
    } catch (error) {
    } finally {
      setPassword("");
    }
  };

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <Trash2 className="h-5 w-5 text-destructive" />
          <p className="text-destructive">Danger Zone</p>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-medium">Delete Account</h4>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all data
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Account</AlertDialogTitle>
                <AlertDialogDescription>
                  This action is permanent and cannot be undone. All your data,
                  posts, and reading lists will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Enter your password to confirm</Label>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputGroupAddon
                    align="inline-end"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="cursor-pointer"
                  >
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </InputGroupAddon>
                </InputGroup>

                {error && (
                  <p className="text-sm text-red-500 text-center">
                    {error?.message}
                  </p>
                )}
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => setPassword("")}
                  >
                    Cancel
                  </Button>
                </AlertDialogCancel>

                <Button
                  variant="destructive"
                  className="bg-destructive text-white hover:bg-destructive/90 min-w-[245px]"
                  disabled={!password || isSubmitting}
                  onClick={handleClick}
                >
                  {isSubmitting ? (
                    <Spinner />
                  ) : (
                    <>
                      <Trash2 /> Permanently Delete Account
                    </>
                  )}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeleteAccountCard;
