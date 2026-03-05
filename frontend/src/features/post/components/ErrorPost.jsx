import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function ErrorPost({ errorStatus, reFetch, postId }) {
  const navigate = useNavigate();
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BookOpen />
        </EmptyMedia>
        <EmptyTitle>
          {errorStatus === 404
            ? "Post not found"
            : "Oops, something went wrong"}
        </EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          {errorStatus === 404
            ? "The post you’re looking for doesn’t exist."
            : "We couldn’t fetch your post right now. Please try again."}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {errorStatus === 404 ? (
          <Button onClick={() => navigate(-1)} variant="outline">
            Go back
          </Button>
        ) : (
          <p
            onClick={() => reFetch(postId)}
            className="text-primary text-center cursor-pointer hover:text-primary/80 hover:underline text-sm font-medium"
          >
            Try Again
          </p>
        )}
      </EmptyContent>
    </Empty>
  );
}

export default ErrorPost;
