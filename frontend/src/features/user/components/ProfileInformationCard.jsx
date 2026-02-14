import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Edit3, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ProfileInformationCard = ({isOwnProfile}) => {
  const [genresData, setGenresData] = useState([
    { id: "mystery", label: "Mystery" },
    { id: "thriller", label: "Thriller" },
    { id: "crime", label: "Crime" },
    { id: "horror", label: "Horror" },
  ]);
  
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start gap-5">
          <Avatar className="w-32 h-32">
            <AvatarImage src="" />
            <AvatarFallback className="text-4xl font-bold bg-primary/10 text-primary">
              IT
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 gap-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-foreground">
                  Ishan Tripathi
                </h1>
                <p className="text-muted-foreground text-lg">@mysteryReader</p>
              </div>
              <Button>
                {isOwnProfile ? (
                  <Edit3 className="h-5 w-5 mr-1" />
                ) : (
                  <UserPlus />
                )}
                {isOwnProfile ? "Edit Profile" : "Follow"}
              </Button>
            </div>
            <p className="text-foreground mb-6 leading-relaxed">
              Avid fantasy reader and book reviewer. Currently working through
              Brandon Sanderson's entire bibliography. Coffee and dragons fuel
              my reading adventures.
            </p>
            <div className="flex gap-5">
              <Badge className="flex flex-1 flex-col gap-1 text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </Badge>
              <Badge className="flex flex-1 flex-col gap-1 text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">189</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </Badge>
              <Badge className="flex flex-1 flex-col gap-1 text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="text-sm text-muted-foreground">Books Read</div>
              </Badge>
            </div>
            <div>
              <Label className="block text-sm font-medium mb-2">
                Favourite Genres
              </Label>
              <div className="flex flex-wrap gap-2">
                {genresData.map((genre) => (
                  <Badge
                    variant="secondary"
                    className="bg-accent/50"
                    key={genre.id}
                  >
                    {genre.label}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Joined March 2023</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInformationCard;
