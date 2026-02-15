import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const CommentCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />{" "}
            </div>
          </div>
          <Skeleton className="h-12 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentCardSkeleton;
