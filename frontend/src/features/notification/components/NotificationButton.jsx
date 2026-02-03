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
          <Badge
            variant="destructive"
            className="absolute -top-2 left-4 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            5
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="pl-0 pr-0 pb-0 w-96">
        <div className="mb-3 pl-4">
          <h3 className="font-semibold text-lg">Notifications</h3>{" "}
          <p className="text-sm text-muted-foreground">1 unread</p>
        </div>
        <div className="notifications">
          <NotificationCard />
          <NotificationCard />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationButton;
