import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Heart } from "lucide-react";

const NotificationCard = ({ sender, type, isRead, createdAt, postTitle }) => {
  const notification = {
    sender,
    senderAvatar: sender
      ? sender.split(" ").reduce((acc, curr) => acc + curr[0].toUpperCase(), "")
      : "",
    postTitle,
    icon: type === "like" ? Heart : MessageCircle,
    iconColor: type === "like" ? "red" : "blue",
    message: type === "like" ? "liked your post" : "commented on your post",
    isRead,
    createdAt,
  };
  return (
    <div
      className={`flex gap-3 pb-4 pt-3 pl-4 pr-4 ${
        !notification.isRead ? "bg-primary/5" : ""
      } border-t border-border hover:bg-accent/50 transition-colors`}
    >
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback className="bg-primary/10 text-primary text-sm">
          {notification.senderAvatar}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex gap-1 items-center min-w-0">
          <notification.icon className={`h-4 w-4 flex-shrink-0 text-${notification.iconColor}-500`} />

          <p className="font-medium text-sm truncate">{notification.sender}</p>

          <p className="text-sm text-foreground truncate">
            {notification.message}
          </p>
        </div>

        <p className="text-xs text-primary truncate">
          {notification.postTitle}
        </p>

        <p className="text-xs text-muted-foreground mt-1">
          {notification.createdAt}
        </p>
      </div>

      {!notification.isRead && (
        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
      )}
    </div>
  );
};

export default NotificationCard;
