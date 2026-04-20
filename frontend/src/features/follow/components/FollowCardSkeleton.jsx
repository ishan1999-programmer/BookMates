import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const FollowCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24 sm:w-32" />
              <Skeleton className="h-3 w-16 sm:w-24" />
            </div>
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowCardSkeleton;
