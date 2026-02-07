import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Camera, ClipboardList, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import genres from "@/data/genres";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const PostDetailsCard = () => {
  const [favouriteGenres, setFavouriteGenres] = useState([]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Post Details
        </CardTitle>
      </CardHeader>

      <CardContent>
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
          <Input placeholder="Enter book title..." />
        </div>
        <div className="mt-4">
          <Label className="block text-sm font-medium mb-2">Author *</Label>
          <Input placeholder="Enter author name" />
        </div>
        <div className="mt-4">
          <Label className="block text-sm font-medium mb-2">Genres</Label>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Badge
                key={genre.id}
                variant={
                  favouriteGenres.includes(genre.id) ? "default" : "outline"
                }
                onClick={() =>
                  setFavouriteGenres((prev) => {
                    if (favouriteGenres.includes(genre.id)) {
                      return prev.filter((val) => val !== genre.id);
                    } else {
                      return [...prev, genre.id];
                    }
                  })
                }
                className="cursor-pointer"
              >
                {genre.label}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <Label className="block text-2xl font-medium mb-2">Your Review</Label>
          <Textarea
            placeholder="Share your thoughts about this book..."
            rows={5}
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline">Reset</Button>
          <Button>Post</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostDetailsCard;
