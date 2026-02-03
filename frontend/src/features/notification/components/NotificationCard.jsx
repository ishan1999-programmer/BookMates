import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Heart } from "lucide-react";

const NotificationCard = () => {
  return (
    <div className="flex gap-3 pb-4 pt-3 pl-4 border-t border-border last:border-b-0 hover:bg-accent/50 transition-colors">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src="" />
        <AvatarFallback className="bg-primary/10 text-primary text-sm">
          IT
        </AvatarFallback>
      </Avatar>
      <div style={{display:"flex", flexDirection:"column",gap:"4px"}}>
        <div className="flex gap-2 items-center">
          <Heart className="h-4 w-4 text-red-500" />
          <p className="font-medium text-sm hover:text-primary transition-colors whitespace-nowrap">
            Ishan Tripathi
          </p>
          <p className="text-sm text-foreground truncate">liked your post</p>
        </div>
        <p className="text-xs text-primary hover:underline block">
          "Rock, Paper, Scissor"
        </p>
        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
      </div>
    </div>
  );
};

export default NotificationCard;
