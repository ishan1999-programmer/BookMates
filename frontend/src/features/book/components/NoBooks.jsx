import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { BookX } from "lucide-react";

function NoBooks() {
  return (
    <Empty className="h-48">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BookX />
        </EmptyMedia>
        <EmptyTitle>No books found</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          We couldn’t find any book matching your search.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent></EmptyContent>
    </Empty>
  );
}

export default NoBooks;
