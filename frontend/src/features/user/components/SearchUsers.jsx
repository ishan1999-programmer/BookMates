import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";
import SearchCard from "./SearchCard";
import SearchCardSkeleton from "./SearchCardSkeleton";
import NoUsers from "./NoUsers";
import ErrorUsers from "./ErrorUsers";
import useSearchUsers from "../hooks/useSearchUsers";
import useDebounce from "../hooks/useDebounce";

const SearchUsers = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery);
  const {
    data: users,
    error,
    isFetching,
    searchUsers: reFetchUsers,
  } = useSearchUsers(debouncedSearchQuery);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setOpen(value.trim().length > 0);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div className="relative">
          <Search className="absolute left-2 top-1/4 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder={isMobile ? "Search..." : "Search users..."}
            className={`pl-9 pr-8 ${
              isMobile ? "w-32" : "w-48 lg:w-64"
            } h-9 bg-muted/50`}
          />
        </div>
      </PopoverAnchor>

      <PopoverContent
        align="start"
        sideOffset={4}
        className={`w-${isMobile ? "48" : "72"} p-2`}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onClick={() => setOpen(false)}
      >
        {isFetching ? (
          <>
            <SearchCardSkeleton />
            <SearchCardSkeleton />
            <SearchCardSkeleton />
          </>
        ) : error ? (
          <ErrorUsers reFetch={reFetchUsers} query={debouncedSearchQuery} />
        ) : users.length === 0 ? (
          <NoUsers />
        ) : (
          <>
            {users.map((user) => (
              <SearchCard
                key={user._id}
                avatar={user.avatar}
                fullname={user.fullname}
                username={user.username}
              />
            ))}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default SearchUsers;
