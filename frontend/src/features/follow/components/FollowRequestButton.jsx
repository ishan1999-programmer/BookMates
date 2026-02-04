import React from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FollowRequestCard from "./FollowRequestCard";

const FollowRequestButton = () => {
  const isMobile = useIsMobile();

  const followRequestData = [
    {
      sender: "Ishan Tripathi",
      createdAt: "2 hours ago",
    },
    {
      sender: "Karuna Gupta",
      createdAt: "2 hours ago",
    },
  ];
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
          {followRequestData.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 left-4 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {followRequestData.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="pl-0 pr-0 pb-0 w-96">
        <div className="mb-3 pl-4">
          <h3 className="font-semibold text-lg">Follow Requests</h3>
          {followRequestData.length > 0 && (
            <p className="text-sm text-muted-foreground">{`${followRequestData.length} pending`}</p>
          )}
        </div>
        {followRequestData.length > 0 ? (
          <div>
            {followRequestData.map((followRequestData) => (
              <FollowRequestCard
                sender={followRequestData.sender}
                createdAt={followRequestData.createdAt}
              />
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No follow requests
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default FollowRequestButton;
