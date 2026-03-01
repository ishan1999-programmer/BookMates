import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  UserPlus,
  UserCheck,
  Send,
  UserRoundPen,
  Calendar,
  UserLock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const ProfileInformationCard = ({
  isOwnProfile,
  userId,
  username,
  fullname,
  bio,
  avatar,
  followersCount,
  followingsCount,
  booksReadCount,
  favGenres,
  createdAt,
  isSendingFollowRequest,
  sendFollowRequest,
  isCancelingFollowRequest,
  cancelFollowRequest,
  isFollowedByMe,
  isUnfollowing,
  unfollowUser,
  isFollowing,
  followUser,
  isPrivate,
  isFollowRequestSent,
  followRequestId,
}) => {
  const [buttonStatus, setButtonStatus] = useState(
    isOwnProfile
      ? "ownProfile"
      : isFollowedByMe
        ? "following"
        : isFollowRequestSent
          ? "requestSent"
          : "requestNotSent",
  );

  const buttonStatusToStyleMap = {
    ownProfile: {
      icon: UserRoundPen,
      text: "Edit Profile",
      variant: "default",
    },
    following: { icon: UserCheck, text: "Following", variant: "outline" },
    requestSent: { icon: Send, text: "Request Sent", variant: "secondary" },
    requestNotSent: {
      icon: UserPlus,
      text: "Follow",
      variant: "default",
    },
  };

  const navigate = useNavigate();

  const handleOnClick = async () => {
    try {
      const currentButtonStatus = buttonStatus;
      if (currentButtonStatus === "ownProfile") {
        navigate("/settings");
      } else if (currentButtonStatus === "following") {
        await unfollowUser(userId);
        setButtonStatus("requestNotSent");
      } else if (currentButtonStatus === "requestSent") {
        await cancelFollowRequest(followRequestId);
        setButtonStatus("requestNotSent");
      } else {
        if (isPrivate) {
          await sendFollowRequest({ receiver: userId });
          setButtonStatus("requestSent");
        } else {
          await followUser(userId);
          setButtonStatus("following");
        }
      }
    } catch (error) {
      toast.error("Action failed. Please try again.", {
        position: "top-center",
      });
    }
  };

  const IconComponent = buttonStatusToStyleMap[buttonStatus].icon;

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start gap-5">
          <Avatar className="w-32 h-32">
            <AvatarImage src={avatar} />
            <AvatarFallback className="text-4xl font-bold bg-primary/10 text-primary">
              IT
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 gap-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-foreground">
                    {fullname}
                  </h1>
                  {isPrivate && (
                    <UserLock className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <p className="text-muted-foreground text-lg">{username}</p>
              </div>
              <Button
                disabled={
                  isSendingFollowRequest ||
                  isCancelingFollowRequest ||
                  isUnfollowing ||
                  isFollowing
                }
                variant={buttonStatusToStyleMap[buttonStatus].variant}
                onClick={handleOnClick}
              >
                {isSendingFollowRequest ||
                isCancelingFollowRequest ||
                isUnfollowing ||
                isFollowing ? (
                  <Spinner />
                ) : (
                  <>
                    <IconComponent />
                    {buttonStatusToStyleMap[buttonStatus].text}
                  </>
                )}
              </Button>
            </div>
            <p className="text-foreground mb-6 leading-relaxed">{bio}</p>
            <div className="flex gap-5">
              <Badge className="flex flex-1 flex-col gap-1 text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {followingsCount}
                </div>
                <div className="text-sm text-muted-foreground">Followings</div>
              </Badge>
              <Badge className="flex flex-1 flex-col gap-1 text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {followersCount}
                </div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </Badge>
              <Badge className="flex flex-1 flex-col gap-1 text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {booksReadCount}
                </div>
                <div className="text-sm text-muted-foreground">Books Read</div>
              </Badge>
            </div>
            {favGenres.length > 0 && (
              <div>
                <Label className="block text-sm font-medium mb-2">
                  Favourite Genres
                </Label>
                <div className="flex flex-wrap gap-2">
                  {favGenres.map((genre) => (
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
            )}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{`Joined ${format(createdAt, "MMMM yyyy")}`}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInformationCard;
