import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Camera, ClipboardList, BookOpen, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import genres from "@/data/genres";
import { useForm, Controller } from "react-hook-form";
const PostDetailsCard = () => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    console.log(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Post Details
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-3">
            <div className="w-20 h-28 bg-muted rounded flex items-center justify-center flex-shrink-0">
              {false ? (
                <img
                  src=""
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <Button variant="outline" size="sm">
              <Camera className="h-4 w-4 mr-2" />
              Upload Cover
            </Button>
          </div>
          <div className="mt-4">
            <Label className="block text-sm font-medium mb-2">Title *</Label>
            <Input
              placeholder="Enter book title..."
              {...register("title", {
                required: "Title is required",
              })}
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {errors.title?.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <Label className="block text-sm font-medium mb-2">Author *</Label>
            <Input
              placeholder="Enter author name"
              {...register("author", {
                required: "Author is required",
              })}
            />
            {errors.author && (
              <p className="text-sm text-red-500 mt-1">
                {errors.author?.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <Label className="block text-sm font-medium mb-2">Genres</Label>
            <Controller
              name="genres"
              control={control}
              defaultValue={[]}
              rules={{
                validate: (value) =>
                  value.length > 0 || "Please select at least one genre",
              }}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => {
                    const isSelected = field.value.includes(genre.id);

                    return (
                      <Badge
                        key={genre.id}
                        className="cursor-pointer"
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => {
                          const newGenres = isSelected
                            ? field.value.filter((g) => g !== genre.id)
                            : [...field.value, genre.id];

                          field.onChange(newGenres);
                        }}
                      >
                        {genre.label}
                      </Badge>
                    );
                  })}
                </div>
              )}
            />
            {errors.genres && (
              <p className="text-sm text-red-500 mt-1">
                {errors.genres?.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Rating</label>
            <Controller
              name="rating"
              defaultValue={0}
              control={control}
              rules={{ min: { value: 1, message: "Rating is required" } }}
              render={({ field }) => (
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 cursor-pointer ${
                        i < field.value
                          ? "fill-amber-500 text-amber-500"
                          : "text-muted-foreground hover:text-amber-500"
                      }`}
                      onClick={() => field.onChange(i + 1)}
                    />
                  ))}
                  <span className="ml-3 text-sm text-muted-foreground">
                    {field.value > 0 ? `${field.value}/5` : "No rating"}
                  </span>
                </div>
              )}
            />
            {errors.rating && (
              <p className="text-sm text-red-500 mt-1">
                {errors.rating?.message}
              </p>
            )}
          </div>
          <div className="mt-8">
            <Label className="block text-2xl font-medium mb-2">
              Your Review
            </Label>
            <Textarea
              placeholder="Share your thoughts about this book..."
              rows={5}
              {...register("review", {
                maxLength: {
                  value: 200,
                  message: "Review must be atmost 200 characters",
                },
              })}
            />
            {errors.review && (
              <p className="text-sm text-red-500">{errors.review?.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Reset</Button>
            <Button type="submit">Post</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostDetailsCard;
