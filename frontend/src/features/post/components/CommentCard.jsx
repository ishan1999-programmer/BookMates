import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const CommentCard = () => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="" />
              <AvatarFallback className="text-m  bg-primary/10 text-primary">
                IT
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h4 className="font-medium text-foreground hover:text-primary transition-colors">
                Ishan Tripathi
              </h4>
              <p className="text-sm text-muted-foreground">1 hour ago</p>
            </div>
          </div>
          <p className="text-foreground">Will definately read this!!!</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
