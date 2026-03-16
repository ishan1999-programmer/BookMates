import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Heart, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const NotificationCard = ({
  notificationId,
  fullname,
  username,
  avatar,
  type,
  isRead,
  createdAt,
  postTitle,
  postId,
  setOpen,
  markNotificationRead,
}) => {
  console.log(type, ": ", postTitle);
  console.log(type, ": ", postId);

  const navigate = useNavigate();
  return (
    <div
      className={`flex gap-3 pb-4 pt-3 pl-4 pr-4 ${
        !isRead ? "bg-primary/5" : ""
      } border-t border-border cursor-pointer`}
      onClick={() => {
        setOpen(false);
        if (type === "like" || type === "comment") {
          navigate(`/posts/${postId}`);
        } else {
          navigate(`/users/${username}`);
        }
        markNotificationRead(notificationId);
      }}
    >
      {!isRead && <div className="w-2 h-2 bg-primary rounded-full mt-3" />}
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src={avatar} />
        <AvatarFallback className="text-m bg-primary/10 text-primary">
          {fullname
            .split(" ")
            .map((u) => u[0])
            .join("")
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex gap-1 items-center min-w-0">
          {type === "like" ? (
            <Heart className={`h-4 w-4 flex-shrink-0 text-red-500`} />
          ) : type === "comment" ? (
            <MessageCircle className={`h-4 w-4 flex-shrink-0 text-blue-500`} />
          ) : (
            <User className={`h-4 w-4 flex-shrink-0 text-green-500`} />
          )}
          <p
            className="font-medium text-sm truncate hover:text-muted-foreground hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
              navigate(`/users/${username}`);
            }}
          >
            {fullname}
          </p>

          <p className="text-sm text-foreground truncate">
            {type === "like"
              ? "liked your post"
              : type === "comment"
                ? "commented on your post"
                : "started following you"}
          </p>
        </div>

        {postTitle && (
          <p className="text-xs text-primary truncate">{postTitle}</p>
        )}

        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(createdAt, { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
