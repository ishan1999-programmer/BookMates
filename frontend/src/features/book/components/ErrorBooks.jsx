import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { BookCopy } from "lucide-react";

function ErrorBooks({ reFetch, query }) {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BookCopy />
        </EmptyMedia>
        <EmptyTitle>Oops, something went wrong</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          We couldn’t fetch books right now. Please try again.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <p
          onClick={() => reFetch(query)}
          className="text-primary text-center cursor-pointer hover:text-primary/80 hover:underline text-sm font-medium"
        >
          Try Again
        </p>
      </EmptyContent>
    </Empty>
  );
}

export default ErrorBooks;
