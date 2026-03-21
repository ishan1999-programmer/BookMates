import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";
import SearchUsersCard from "./SearchUsersCard";
import SearchUsersCardSkeleton from "./SearchUsersCardSkeleton";
import NoUsers from "./NoUsers";
import ErrorUsers from "./ErrorUsers";
import useSearchUsers from "../hooks/useSearchUsers";
import useDebounce from "../hooks/useDebounce";

const SearchUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
//   const debouncedSearchQuery = useDebounce(searchQuery);
//   const {
//     data: users,
//     error,
//     isFetching,
//     searchUsers: reFetchUsers,
//   } = useSearchUsers(debouncedSearchQuery);

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
            placeholder="Search books..."
            className="pl-9 pr-8 h-9 bg-muted/50"
          />
        </div>
      </PopoverAnchor>

      <PopoverContent
        align="start"
        sideOffset={4}
        className="p-2"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onClick={() => setOpen(false)}
      >
        {isFetching ? (
          <>
            <SearchUsersCardSkeleton />
            <SearchUsersCardSkeleton />
            <SearchUsersCardSkeleton />
          </>
        ) : error ? (
          <ErrorUsers reFetch={reFetchUsers} query={debouncedSearchQuery} />
        ) : users.length === 0 ? (
          <NoUsers />
        ) : (
          <>
            {users.map((user) => (
              <SearchUsersCard
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
