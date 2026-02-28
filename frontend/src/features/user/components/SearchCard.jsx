import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const SearchCard = ({ fullname, username, avatar, _id }) => {
  return (
    <Link to={`/users/${username}`}>
      <div
        className={`flex gap-3 pb-4 pt-3 pl-2 pr-4  hover:bg-accent/50 transition-colors`}
      >
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-primary/10 text-primary">
            IT
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col min-w-0">
          <p className="font-medium text-sm truncate">{fullname}</p>
          <p className="text-xs text-primary truncate">{username}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
