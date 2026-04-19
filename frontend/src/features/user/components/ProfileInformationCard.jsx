import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const ProfileInformationCard = ({
  user,
  isOwnProfile,
  sendFollowRequest,
  cancelFollowRequest,
  unfollowUser,
  followUser,
  isSubmitting,
}) => {
  const navigate = useNavigate();
  const {
    _id: userId,
    username,
    fullname,
    bio,
    avatar,
    followersCount,
    followingsCount,
    booksReadCount,
    favGenres,
    createdAt,
    isFollowedByMe,
    isPrivate,
    isFollowRequestSent,
    followRequestId,
  } = user;

  const buttonStatus = isOwnProfile
    ? "ownProfile"
    : isFollowedByMe
      ? "following"
      : isFollowRequestSent
        ? "requestSent"
        : "requestNotSent";

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

  const handleOnClick = async () => {
    try {
      if (buttonStatus === "ownProfile") {
        navigate("/settings");
      } else if (buttonStatus === "following") {
        await unfollowUser(userId);
      } else if (buttonStatus === "requestSent") {
        await cancelFollowRequest(followRequestId);
      } else {
        if (isPrivate) {
          await sendFollowRequest({ receiver: userId });
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
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
          <Avatar className="w-20 h-20 sm:w-28 sm:h-28">
            <AvatarImage src={avatar} />
            <AvatarFallback className="text-2xl sm:text-4xl font-bold bg-primary/10 text-primary">
              {fullname
                .split(" ")
                .map((u) => u[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col flex-1 min-w-0 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground break-words">
                    {fullname}
                  </h1>
                  {isPrivate && (
                    <UserLock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                </div>

                <p className="text-muted-foreground text-sm sm:text-base break-words">
                  {username}
                </p>
              </div>

              <Button
                disabled={isSubmitting}
                variant={buttonStatusToStyleMap[buttonStatus].variant}
                onClick={handleOnClick}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <Spinner />
                ) : (
                  <>
                    <IconComponent />
                    {buttonStatusToStyleMap[buttonStatus].text}
                  </>
                )}
              </Button>
            </div>

            {bio && (
              <p className="text-foreground leading-relaxed text-sm sm:text-base break-words">
                {bio}
              </p>
            )}

            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center justify-center gap-1 p-3 sm:p-4 bg-muted/50 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-primary">
                  {followingsCount}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Followings
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-1 p-3 sm:p-4 bg-muted/50 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-primary">
                  {followersCount}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Followers
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-1 p-3 sm:p-4 bg-muted/50 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-primary">
                  {booksReadCount}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Books Read
                </div>
              </div>
            </div>

            {/* Genres */}
            {favGenres.length > 0 && (
              <div>
                <Label className="block text-sm font-medium mb-2">
                  Favourite Genres
                </Label>
                <div className="flex flex-wrap gap-2">
                  {favGenres.map((genre, idx) => (
                    <Badge
                      variant="secondary"
                      className="bg-accent/50 text-xs sm:text-sm"
                      key={idx}
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Joined */}
            <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span className="break-words">
                {`Joined ${format(createdAt, "MMMM yyyy")}`}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInformationCard;
