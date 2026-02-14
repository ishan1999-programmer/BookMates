import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import genres from "@/data/genres";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ProfileSettingsCard = () => {
  const [favouriteGenres, setFavouriteGenres] = useState([
    "mystery",
    "thriller",
  ]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Information
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-3">
          <Avatar className="w-20 h-20">
            <AvatarImage src="" />
            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
              IT
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm">
            <Camera className="h-4 w-4 mr-2" />
            Change Photo
          </Button>
        </div>
        <div className="mt-4">
          <Label className="block text-sm font-medium mb-2">Name</Label>
          <Input placeholder="Your full name" />
        </div>
        <div className="mt-4">
          <Label className="block text-sm font-medium mb-2">Username</Label>
          <Input placeholder="Your display name" />
        </div>
        <div className="mt-4">
          <Label className="block text-sm font-medium mb-2">Bio</Label>
          <Textarea placeholder="Tell others about yourself..." rows={3} />
        </div>
        <div className="mt-4">
          <Label className="block text-sm font-medium mb-2">
            Favourite Genres
          </Label>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Badge
                key={genre.id}
                variant={
                  favouriteGenres.includes(genre.id) ? "default" : "outline"
                }
                className="cursor-pointer"
              >
                {genre.label}
              </Badge>
            ))}
          </div>
        </div>
        <Button className="mt-4">Save Profile</Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSettingsCard;
