import { Skeleton } from "@/components/ui/skeleton";

const SearchBooksCardSkeleton = () => {
  return (
    <div className="flex justify-between items-start pb-2 pt-3 border-b border-border gap-2">
      <div className="flex gap-3 min-w-0">
        <Skeleton className="w-12 h-16 rounded flex-shrink-0" />

        <div className="flex flex-col min-w-0 gap-2">
          <Skeleton className="h-4 w-full sm:w-48" />
          <Skeleton className="h-3 w-24 sm:w-32" />
        </div>
      </div>

      <div className="flex items-center flex-shrink-0">
        <Skeleton className="h-7 w-16 sm:h-8 sm:w-24 rounded" />
      </div>
    </div>
  );
};

export default SearchBooksCardSkeleton;
