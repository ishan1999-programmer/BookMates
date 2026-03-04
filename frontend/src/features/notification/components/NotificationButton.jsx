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
import NotificationCardSkeleton from "./NotificationCardSkeleton";
import NoNotifications from "./NoNotifications";
import ErrorNotifications from "./ErrorNotifications";
import useFetchNotifications from "../hooks/useFetchNotifications";

const NotificationButton = () => {
  const { data, isFetching, error, fetchNotifications } =
    useFetchNotifications();
  const isMobile = useIsMobile();

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
          {data.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 left-4 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {data.length}
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
          {!isFetching && !error && data.length > 0 && (
            <p className="text-sm text-muted-foreground">{`${data.length} unread`}</p>
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
        ) : data.length === 0 ? (
          <NoNotifications />
        ) : (
          <>
            {data.map((d) => (
              <NotificationCard
                key={d._id}
                fullname={d.sender.fullname}
                username={d.sender.username}
                avatar={d.sender.avatar}
                type={d.type}
                postTitle={d.post.bookTitle}
                isRead={d.isRead}
                createdAt={d.createdAt}
              />
            ))}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationButton;
