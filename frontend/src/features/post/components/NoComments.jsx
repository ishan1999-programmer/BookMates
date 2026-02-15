import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { MessageCircle } from "lucide-react";

function NoComments() {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MessageCircle />
        </EmptyMedia>
        <EmptyTitle>No comments yet</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          Be the first to share your thoughts on this post.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent></EmptyContent>
    </Empty>
  );
}

export default NoComments;
