import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Heart } from "lucide-react";
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
  const navigate = useNavigate();
  return (
    <div
      className={`flex gap-3 pb-4 pt-3 pl-4 pr-4 ${
        !isRead ? "bg-primary/5" : ""
      } border-t border-border cursor-pointer`}
      onClick={() => {
        setOpen(false);
        navigate(`/posts/${postId}`);
        markNotificationRead(notificationId);
      }}
    >
      {!isRead && <div className="w-2 h-2 bg-primary rounded-full mt-3" />}
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src={avatar} />
        <AvatarFallback className="bg-primary/10 text-primary text-sm">
          {avatar}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex gap-1 items-center min-w-0">
          {type === "like" ? (
            <Heart className={`h-4 w-4 flex-shrink-0 text-red-500`} />
          ) : (
            <MessageCircle className={`h-4 w-4 flex-shrink-0 text-blue-500`} />
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
            {type === "like" ? "liked your post" : "commented on your post"}
          </p>
        </div>

        <p className="text-xs text-primary truncate">{postTitle}</p>

        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(createdAt, { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
