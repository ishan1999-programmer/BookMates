import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const ProfileInformationCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start gap-5">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="flex flex-col flex-1 gap-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-24" />{" "}
              </div>
              <Skeleton className="h-10 w-24" />
            </div>
            <Skeleton className="h-24 w-full" />
            <div className="flex gap-5">
              <Skeleton className="h-24 w-40" />
              <Skeleton className="h-24 w-40" />
              <Skeleton className="h-24 w-40" />
            </div>
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
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
