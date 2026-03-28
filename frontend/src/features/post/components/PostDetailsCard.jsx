import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Camera, ClipboardList, BookOpen, Star, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import genres from "@/data/genres";
import { useForm, Controller } from "react-hook-form";
import useCreatePost from "../hooks/useCreatePost";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useState, useRef } from "react";
import useS3Upload from "@/features/upload/hooks/useS3Upload";

const PostDetailsCard = () => {
  const { isSubmitting, createPost } = useCreatePost();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const { isUploading, uploadFile, progress } = useS3Upload();
  const fileInputRef = useRef(null);
  const [bookCover, setBookCover] = useState("");

  const onSubmit = async (formData) => {
    try {
      await createPost({ ...formData, bookCover });
      reset();
      toast.success("Post published successfully.", {
        position: "top-center",
      });
      navigate("/feed");
    } catch (error) {
      setError("root", {
        message: error?.message || "Something went wrong. Please try again.",
      });
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBookCover(URL.createObjectURL(file));
    try {
      const fileUrl = await uploadFile(file);
      setBookCover(fileUrl);
    } catch (error) {
      toast.error("Upload failed. Please try again", {
        position: "top-center",
      });
      setBookCover("");
      e.target.value = null;
    }
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
            <div className="relative w-20 h-28 bg-muted rounded flex items-center justify-center flex-shrink-0">
              {bookCover ? (
                <img
                  src={bookCover}
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-xs">
                  <span>{progress}%</span>
                </div>
              )}
              {bookCover && !isUploading && (
                <Badge
                  size="xs"
                  variant="destructive"
                  className="items-center justify-center rounded-full p-0 absolute -top-3 -right-3 cursor-pointer hover:bg-red "
                  onClick={() => setBookCover("")}
                >
                  <X />
                </Badge>
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
                size="sm"
                disabled={isUploading}
                onClick={(e) => {
                  e.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                <Camera className="h-4 w-4 mr-2" />
                Upload Cover
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <Label className="block text-sm font-medium mb-2">Title *</Label>
            <Input
              placeholder="Enter book title..."
              {...register("bookTitle", {
                required: "Title is required",
              })}
            />
            {errors.bookTitle && (
              <p className="text-sm text-red-500 mt-1">
                {errors.bookTitle?.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <Label className="block text-sm font-medium mb-2">Author *</Label>
            <Input
              placeholder="Enter author name"
              {...register("bookAuthor", {
                required: "Author is required",
              })}
            />
            {errors.bookAuthor && (
              <p className="text-sm text-red-500 mt-1">
                {errors.bookAuthor?.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <Label className="block text-sm font-medium mb-2">Genres</Label>
            <Controller
              name="bookGenres"
              control={control}
              defaultValue={[]}
              rules={{
                validate: (value) =>
                  value.length > 0 || "Please select at least one genre",
              }}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre, idx) => {
                    const isSelected = field.value.includes(genre);

                    return (
                      <Badge
                        key={idx}
                        className="cursor-pointer"
                        variant={isSelected ? "default" : "outline"}
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
            {errors.bookGenres && (
              <p className="text-sm text-red-500 mt-1">
                {errors.bookGenres?.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Rating</label>
            <Controller
              name="bookRating"
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
            {errors.bookRating && (
              <p className="text-sm text-red-500 mt-1">
                {errors.bookRating?.message}
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
              {...register("bookReview", {
                required: "Book review is required.",
                minLength: {
                  value: 10,
                  message: "Review must be atlest 10 charecters long.",
                },
                maxLength: {
                  value: 1200,
                  message: "Review must be atmost 1200 characters long.",
                },
              })}
            />
            {errors.bookReview && (
              <p className="text-sm text-red-500 mt-1">
                {errors.bookReview?.message}
              </p>
            )}
          </div>
          {errors.root && (
            <p className="text-sm text-red-500 mt-1 text-center">
              {errors.root?.message}
            </p>
          )}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              disabled={isSubmitting}
              variant="outline"
              type="button"
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : "Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostDetailsCard;
