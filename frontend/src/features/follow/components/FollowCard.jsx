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
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-3 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0">
              <AvatarImage src={avatar} />
              <AvatarFallback className="text-xs sm:text-base bg-primary/10 text-primary">
                {fullname
                  .split(" ")
                  .map((u) => u[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col min-w-0">
              <Link to={`/users/${username}`}>
                <h4 className="font-medium text-sm sm:text-base break-words break-all leading-tight">
                  {fullname}
                </h4>
              </Link>

              <p className="text-[11px] sm:text-sm text-muted-foreground break-words break-all leading-tight">
                {username}
              </p>
            </div>
          </div>

          {!isOwnFollowCard && (
            <div className="flex-shrink-0">
              <Button
                variant={buttonStatusToStyleMap[buttonStatus].variant}
                onClick={handleOnClick}
                disabled={submittingIds[userId]}
                className="h-7 sm:h-8 px-2 sm:px-3 text-[11px] sm:text-sm whitespace-nowrap"
              >
                {submittingIds[userId] ? (
                  <Spinner />
                ) : (
                  <>
                    <IconComponent className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{buttonStatusToStyleMap[buttonStatus].text}</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowCard;
