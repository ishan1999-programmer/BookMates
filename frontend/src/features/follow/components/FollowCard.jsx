import { useState } from "react";
import { UserPlus, UserCheck, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const FollowCard = ({
  user,
  sendFollowRequest,
  cancelFollowRequest,
  unfollowUser,
  followUser,
  submittingIds,
  isOwnProfile,
}) => {
  const myUsername = localStorage.getItem("username");

  const {
    _id: userId,
    username,
    fullname,
    avatar,
    isFollowedByMe,
    isPrivate,
    isFollowRequestSent,
    followRequestId,
  } = user;

  const buttonStatus = isFollowedByMe
    ? "following"
    : isFollowRequestSent
      ? "requestSent"
      : "requestNotSent";

  const buttonStatusToStyleMap = {
    following: { icon: UserCheck, text: "Following", variant: "outline" },
    requestSent: { icon: Send, text: "Request Sent", variant: "secondary" },
    requestNotSent: {
      icon: UserPlus,
      text: "Follow",
      variant: "default",
    },
  };

  const isOwnFollowCard = myUsername === username;

  const handleOnClick = async () => {
    try {
      if (buttonStatus === "following") {
        await unfollowUser(userId, isOwnProfile);
      } else if (buttonStatus === "requestSent") {
        await cancelFollowRequest(followRequestId, userId);
      } else {
        if (isPrivate) {
          await sendFollowRequest({ receiver: userId }, userId);
        } else {
          await followUser(userId);
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={avatar} />
              <AvatarFallback className="text-m bg-primary/10 text-primary">
                {fullname
                  .split(" ")
                  .map((u) => u[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Link to={`/users/${username}`}>
                <h4 className="font-semibold text-foreground hover:text-muted-foreground hover:underline">
                  {fullname}
                </h4>
              </Link>
              <p className="text-sm text-muted-foreground">{username}</p>
            </div>
          </div>
          {!isOwnFollowCard && (
            <Button
              variant={buttonStatusToStyleMap[buttonStatus].variant}
              onClick={handleOnClick}
              disabled={submittingIds[userId]}
            >
              {submittingIds[userId] ? (
                <Spinner />
              ) : (
                <>
                  <IconComponent />
                  {buttonStatusToStyleMap[buttonStatus].text}
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowCard;
