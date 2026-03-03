import { Skeleton } from "@/components/ui/skeleton";

const FollowReqestCardSkeleton = () => {
  return (
    <div className="flex gap-3 pb-4 pt-3 pl-4 pr-4 border-t border-border hover:bg-accent/50 transition-colors">
      <Skeleton className="w-8 h-8 rounded-full" />

      <div className="flex flex-col gap-2 min-w-0">
        <Skeleton className="w-64 h-4" />
        <Skeleton className="w-16 h-3" />
        <div className="flex space-x-2 mt-3">
          <Skeleton className="w-28 h-7" />
          <Skeleton className="w-28 h-7" />
        </div>
      </div>
    </div>
  );
};

export default FollowReqestCardSkeleton;
