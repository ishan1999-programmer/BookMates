import { Skeleton } from "@/components/ui/skeleton";

const NotificationCardSkeleton = () => {
  return (
    <div className="flex gap-3 pb-4 pt-3 pl-4 pr-4 border-t border-border">
      <Skeleton className="w-8 h-8 rounded-full" />

      <div className="flex flex-col gap-1 min-w-0">
        <Skeleton className="w-64 h-4 mb-1" />

        <Skeleton className="w-32 h-3 mb-2" />

        <Skeleton className="w-16 h-3" />
      </div>
    </div>
  );
};

export default NotificationCardSkeleton;
