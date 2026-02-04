import React from "react";
import { Bell, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationCard from "./NotificationCard";

const NotificationButton = () => {
  const isMobile = useIsMobile();

  const notificationData = [
    {
      sender: "Ishan Tripathi",
      type: "like",
      postTitle: "The Silent Patient",
      isRead: true,
      createdAt: "2 hours ago",
    },
    {
      sender: "Karuna Gupta",
      type: "comment",
      postTitle: "Rock Paper Scissor",
      isRead: false,
      createdAt: "2 hours ago",
    },
  ];

  const unreadCount = notificationData.reduce(
    (acc, curr) => (!curr.isRead ? acc + 1 : 0),
    0
  );
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-accent"
        >
          <Bell
            className={`${isMobile ? "h-4 w-4" : "h-6 w-6"} text-primary`}
          />{" "}
          {notificationData.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 left-4 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="pl-0 pr-0 pb-0 w-96">
        <div className="mb-3 pl-4">
          <h3 className="font-semibold text-lg">Notifications</h3>{" "}
          {notificationData.length > 0 && (
            <p className="text-sm text-muted-foreground">{`${unreadCount} unread`}</p>
          )}
        </div>
        {notificationData.length > 0 ? (
          <div>
            {notificationData.map((notification) => (
              <NotificationCard
                sender={notification.sender}
                type={notification.type}
                postTitle={notification.postTitle}
                isRead={notification.isRead}
                createdAt={notification.createdAt}
              />
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No notifications yet
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationButton;
