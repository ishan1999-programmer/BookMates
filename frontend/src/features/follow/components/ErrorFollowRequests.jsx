import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { UserX } from "lucide-react";

function ErrorFollowRequests({ fetchAgain }) {
  return (
    <div className="border-border border-t">
      <Empty className="h-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UserX />
          </EmptyMedia>
          <EmptyTitle>Oops, something went wrong</EmptyTitle>
          <EmptyDescription className="max-w-xs text-pretty">
            We couldn’t fetch your follow requests right now. Please try again.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <p
            onClick={() => fetchAgain()}
            className="text-primary text-center cursor-pointer hover:text-primary/80 hover:underline text-sm font-medium"
          >
            Try Again
          </p>
        </EmptyContent>
      </Empty>
    </div>
  );
}

export default ErrorFollowRequests;
