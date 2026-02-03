import React from "react";
import { BookOpen, Search, Bell, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FollowRequestButton = () => {
  const isMobile = useIsMobile();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-accent"
        >
          <User
            className={`${isMobile ? "h-4 w-4" : "h-6 w-6"} text-primary`}
          />
          <Badge
            variant="destructive"
            className="absolute -top-2 left-4 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            5
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end"></PopoverContent>
    </Popover>
  );
};

export default FollowRequestButton;
