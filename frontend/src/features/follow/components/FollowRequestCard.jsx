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
      {/* Avatar */}
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

      {/* Content */}
      <div className="flex flex-col gap-1 min-w-0">
        {/* Top text row */}
        <div className="flex gap-1 items-start min-w-0">
          <UserPlus className="h-4 w-4 flex-shrink-0 text-green-500 mt-[2px]" />

          <div className="flex flex-wrap items-start gap-x-1 min-w-0">
            <Link to={`/users/${username}`}>
              <p className="font-medium text-sm break-words hover:text-muted-foreground hover:underline">
                {fullname}
              </p>
            </Link>

            <p className="text-sm text-foreground break-words">
              wants to follow you
            </p>
          </div>
        </div>

        {/* Time */}
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(createdAt, { addSuffix: true })}
        </p>

        {/* Actions */}
        <div className="flex gap-2 mt-2 flex-wrap sm:flex-nowrap">
          <Button
            size="sm"
            className="h-7 px-2 sm:px-3 text-[11px] sm:text-xs flex-1 sm:flex-none"
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
            size="sm"
            variant="outline"
            className="h-7 px-2 sm:px-3 text-[11px] sm:text-xs flex-1 sm:flex-none"
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
