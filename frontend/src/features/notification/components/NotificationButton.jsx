import React, { useState } from "react";
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
import NotificationCardSkeleton from "./NotificationCardSkeleton";
import NoNotifications from "./NoNotifications";
import ErrorNotifications from "./ErrorNotifications";
import useFetchNotifications from "../hooks/useFetchNotifications";

const NotificationButton = () => {
  const [open, setOpen] = useState(false);
  const { data, isFetching, error, fetchNotifications, markNotificationRead } =
    useFetchNotifications();
  const isMobile = useIsMobile();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-accent"
        >
          <Bell
            className={`${isMobile ? "h-4 w-4" : "h-6 w-6"} text-primary`}
          />{" "}
          {data.notReadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 left-4 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {data.notReadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="pl-0 pr-0 pb-0 w-96 max-h-[357px] overflow-y-auto"
      >
        <div className="mb-3 pl-4">
          <h3 className="font-semibold text-lg">Notifications</h3>{" "}
          {!isFetching && !error && data.notReadCount > 0 && (
            <p className="text-sm text-muted-foreground">{`${data.notReadCount} unread`}</p>
          )}
        </div>
        {isFetching ? (
          <>
            <NotificationCardSkeleton />
            <NotificationCardSkeleton />
            <NotificationCardSkeleton />
          </>
        ) : error ? (
          <ErrorNotifications fetchAgain={fetchNotifications} />
        ) : data.notifications.length === 0 ? (
          <NoNotifications />
        ) : (
          <>
            {data.notifications.map((notification) => (
              <NotificationCard
                key={notification._id}
                notificationId={notification._id}
                fullname={notification.sender.fullname}
                username={notification.sender.username}
                avatar={notification.sender.avatar}
                type={notification.type}
                postTitle={
                  notification.post ? notification.post.bookTitle : null
                }
                postId={notification.post ? notification.post._id : null}
                isRead={notification.isRead}
                createdAt={notification.createdAt}
                setOpen={setOpen}
                markNotificationRead={markNotificationRead}
              />
            ))}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationButton;
