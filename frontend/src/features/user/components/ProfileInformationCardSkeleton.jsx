import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const ProfileInformationCardSkeleton = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
          <Skeleton className="w-20 h-20 sm:w-28 sm:h-28 rounded-full" />

          <div className="flex flex-col flex-1 min-w-0 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-col gap-1 min-w-0">
                <Skeleton className="h-5 sm:h-6 w-36 sm:w-44" />
                <Skeleton className="h-4 w-24 sm:w-32" />
              </div>

              <Skeleton className="h-10 w-full sm:w-24" />
            </div>

            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-16 sm:h-20 w-full rounded-lg" />
              <Skeleton className="h-16 sm:h-20 w-full rounded-lg" />
              <Skeleton className="h-16 sm:h-20 w-full rounded-lg" />
            </div>

            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-6 w-16 sm:h-7 sm:w-20 rounded-full"
                  />
                ))}
              </div>
            </div>

            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInformationCardSkeleton;
