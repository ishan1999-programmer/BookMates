import { useState } from "react";
import {
  UserPlus,
  UserCheck,
  Send,
  UserRoundPen,
  Calendar,
  UserLock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const FollowCard = ({
  fullname,
  username,
  avatar,
  isFollowedByMe,
  isFollowRequestSent,
}) => {
  const [buttonStatus, setButtonStatus] = useState(
    isFollowedByMe
      ? "following"
      : isFollowRequestSent
        ? "requestSent"
        : "requestNotSent",
  );

  const buttonStatusToStyleMap = {
    following: { icon: UserCheck, text: "Following", variant: "outline" },
    requestSent: { icon: Send, text: "Request Sent", variant: "secondary" },
    requestNotSent: {
      icon: UserPlus,
      text: "Follow",
      variant: "default",
    },
  };

  const IconComponent = buttonStatusToStyleMap[buttonStatus].icon;

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={avatar} />
              <AvatarFallback className="text-m bg-primary/10 text-primary">
                {fullname
                  .split(" ")
                  .map((u) => u[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Link to={`/users/${username}`}>
                <h4 className="font-semibold text-foreground hover:text-muted-foreground hover:underline">
                  {fullname}
                </h4>
              </Link>
              <p className="text-sm text-muted-foreground">{username}</p>
            </div>
          </div>
          <Button variant={buttonStatusToStyleMap[buttonStatus].variant}>
            <IconComponent />
            {buttonStatusToStyleMap[buttonStatus].text}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowCard;
