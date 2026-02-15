import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

const CommentCard = ({ fullname, avatar, createdAt, text }) => {
  
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={avatar} />
              <AvatarFallback className="text-m  bg-primary/10 text-primary">
                IT
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h4 className="font-medium text-foreground hover:text-primary transition-colors">
                {fullname}
              </h4>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(createdAt, { addSuffix: true })}
              </p>
            </div>
          </div>
          <p className="text-foreground">{text}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
