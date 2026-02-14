import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { BookOpen } from "lucide-react";

function ErrorPosts({ fetchNext }) {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BookOpen />
        </EmptyMedia>
        <EmptyTitle>Oops, something went wrong</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          We couldn’t fetch your feed right now. Please try again.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <p
          onClick={() => fetchNext()}
          className="text-primary text-center cursor-pointer hover:text-primary/80 hover:underline text-sm font-medium"
        >
          Try Again
        </p>
      </EmptyContent>
    </Empty>
  );
}

export default ErrorPosts;
