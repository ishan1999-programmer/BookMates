import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import genres from "@/data/genres";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useForm, Controller } from "react-hook-form";
import useUpdateUserInfo from "../hooks/useUpdateUserInfo";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import useS3Upload from "@/features/upload/hooks/useS3Upload";

const ProfileSettingsCard = ({
  fullname,
  username,
  avatar,
  bio,
  favGenres,
}) => {
  const { isSubmitting, updateUserInfo } = useUpdateUserInfo();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    control,
    formState: { errors },
  } = useForm({ defaultValues: { fullname, username, bio } });
  const { data, isUploading, uploadFile } = useS3Upload();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const onSubmit = async (formData) => {
    try {
      const finalFormData = { ...formData, avatar: data };
      await updateUserInfo(finalFormData);
      toast.success("Profile information updated successfully", {
        position: "top-center",
      });
    } catch (error) {
      setError("root", {
        message:
          error?.message ||
          "Updating profile information failed. Please try again.",
      });
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    try {
      await uploadFile(file);
    } catch (error) {
      toast.error("Upload failed. Please try again", {
        position: "top-center",
      });
      setFile(null);
      e.target.value = null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Information
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src={file ? URL.createObjectURL(file) : avatar} />
                <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                  {fullname
                    .split(" ")
                    .map((u) => u[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isUploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full">
                  <Spinner />
                </div>
              )}
            </div>
            <div>
              <Input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                disabled={isUploading}
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                <Camera className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <Label className="block text-sm font-medium mb-2">Name</Label>
            <Input
              placeholder="Your full name"
              {...register("fullname", {
                required: "Full Name is required",
                minLength: {
                  value: 3,
                  message: "Full name must be at least 3 characters long",
                },
              })}
            />
            {errors.fullname && (
              <p className="text-sm text-red-500 mt-1">
                {errors.fullname?.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <Label className="block text-sm font-medium mb-2">Username</Label>
            <Input
              placeholder="Your display name"
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
              <p className="text-sm text-red-500 mt-1">
                {errors.username?.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <Label className="block text-sm font-medium mb-2">Bio</Label>
            <Textarea
              placeholder="Tell others about yourself..."
              rows={3}
              {...register("bio", {
                maxLength: {
                  value: 250,
                  message: "Bio must be at most 250 characters long",
                },
              })}
            />
            {errors.bio && (
              <p className="text-sm text-red-500 mt-1">{errors.bio?.message}</p>
            )}
          </div>
          <div className="mt-4">
            <Label className="block text-sm font-medium mb-2">
              Favourite Genres
            </Label>
            <Controller
              name="favGenres"
              defaultValue={favGenres}
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre, idx) => {
                    const isSelected = field.value.includes(genre);
                    return (
                      <Badge
                        key={idx}
                        variant={isSelected ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          const newGenres = isSelected
                            ? field.value.filter((g) => g !== genre)
                            : [...field.value, genre];
                          field.onChange(newGenres);
                        }}
                      >
                        {genre}
                      </Badge>
                    );
                  })}
                </div>
              )}
            />
          </div>
          <p className="text-sm text-red-500 text-center mt-2">
            {errors.root?.message}
          </p>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="mt-4 w-[110px]"
            >
              {isSubmitting ? <Spinner /> : "Save Profile"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettingsCard;
