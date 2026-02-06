import React from "react";
import { UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const FollowCard = ({ fullname, username, isFollow }) => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src="" />
              <AvatarFallback className="text-m font-bold bg-primary/10 text-primary">
                IT
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h4 className="font-semibold">{fullname}</h4>
              <p className="text-sm text-muted-foreground">{username}</p>
            </div>
          </div>
          <Button variant={!isFollow ? "default" : "outline"}>
            {!isFollow && <UserPlus />}
            {isFollow ? "Following" : "Follow"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowCard;
