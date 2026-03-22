import { Skeleton } from "@/components/ui/skeleton";

const SearchBooksCardSkeleton = () => {
  return (
    <div
      className={`flex justify-between pb-2 pt-3 pl-2 pr-4 border-b border-border`}
    >
      <div className="flex gap-3">
        <Skeleton className="w-12 h-16" />
        <div className="flex flex-col min-w-0 gap-2">
          <Skeleton className="w-48 h-4" />
          <Skeleton className="w-20 h-3" />
        </div>
      </div>
      <Skeleton className="w-24 h-8" />
    </div>
  );
};

export default SearchBooksCardSkeleton;
