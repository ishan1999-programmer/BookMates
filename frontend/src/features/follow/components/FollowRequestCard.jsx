import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "react-router-dom";

const FollowReqestCard = ({
  followRequestId,
  fullname,
  username,
  createdAt,
  avatar,
  acceptFollowRequest,
  rejectFollowRequest,
  isSubmittingIds,
}) => {
  const handleAcceptFollowRequest = async () => {
    try {
      await acceptFollowRequest(followRequestId);
    } catch (error) {
      toast.error("Something went wrong. Please try again", {
        position: "top-center",
      });
    }
  };

  const handleRejectFollowRequest = async () => {
    try {
      await rejectFollowRequest(followRequestId);
    } catch (error) {
      toast.error("Something went wrong. Please try again", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex gap-3 pb-4 pt-3 pl-4 pr-4 border-t border-border">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src={avatar} />
        <AvatarFallback className="text-m bg-primary/10 text-primary">
          {fullname
            .split(" ")
            .map((u) => u[0])
            .join("")
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex gap-1 items-center min-w-0">
          <UserPlus className="h-4 w-4 text-green-500" />
          <Link to={`/users/${username}`}>
            <p className="font-medium text-sm truncate hover:text-muted-foreground hover:underline">
              {fullname}
            </p>
          </Link>
          <p className="text-sm text-foreground truncate">
            wants to follow you
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(createdAt, { addSuffix: true })}
        </p>
        <div className="flex space-x-2 mt-3">
          <Button
            size="m"
            className="h-7 px-3"
            onClick={handleAcceptFollowRequest}
            disabled={isSubmittingIds[followRequestId]}
          >
            {isSubmittingIds[followRequestId] === "accepting" ? (
              <Spinner />
            ) : (
              <>
                <Check className="h-3 w-3 mr-1" />
                Accept
              </>
            )}
          </Button>
          <Button
            size="m"
            variant="outline"
            className="h-7 px-3"
            onClick={handleRejectFollowRequest}
            disabled={isSubmittingIds[followRequestId]}
          >
            {isSubmittingIds[followRequestId] === "rejecting" ? (
              <Spinner />
            ) : (
              <>
                <X className="h-3 w-3 mr-1" />
                Decline
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FollowReqestCard;
