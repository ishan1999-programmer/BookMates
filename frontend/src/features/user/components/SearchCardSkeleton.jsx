import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const SearchCardSkeleton = ({ fullname, username, avatar, _id }) => {
  return (
    <div
      className={`flex gap-3 pb-4 pt-3 pl-2 pr-4  hover:bg-accent/50 transition-colors`}
    >
      <Skeleton className="h-8 w-8 rounded-full" />

      <div className="flex flex-col gap-1 min-w-0">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
};

export default SearchCardSkeleton;
