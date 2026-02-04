import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const FollowReqestCard = ({ sender, createdAt }) => {
  const followRequest = {
    sender,
    senderAvatar: sender
      ? sender.split(" ").reduce((acc, curr) => acc + curr[0].toUpperCase(), "")
      : "",
    createdAt,
  };
  return (
    <div className="flex gap-3 pb-4 pt-3 pl-4 pr-4 border-t border-border hover:bg-accent/50 transition-colors">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback className="bg-primary/10 text-primary text-sm">
          {followRequest.senderAvatar}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex gap-1 items-center min-w-0">
          <UserPlus className="h-4 w-4 text-green-500" />

          <p className="font-medium text-sm truncate">{followRequest.sender}</p>

          <p className="text-sm text-foreground truncate">
            wants to follow you
          </p>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {followRequest.createdAt}
        </p>
        <div className="flex space-x-2 mt-1">
          <Button
            size="m"
            className="h-7 px-3"
          >
            <Check className="h-3 w-3 mr-1" />
            Accept
          </Button>
          <Button
            size="m"
            variant="outline"
            className="h-7 px-3"
          >
            <X className="h-3 w-3 mr-1" />
            Decline
          </Button>
        </div>{" "}
      </div>
    </div>
  );
};

export default FollowReqestCard;
