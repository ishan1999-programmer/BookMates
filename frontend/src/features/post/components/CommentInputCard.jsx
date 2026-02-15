import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useCreateComment from "../hooks/useCreateComment";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const CommentInputCard = ({ postId, onCreateComment }) => {
  const { isSubmitting, createComment, error } = useCreateComment();
  const [comment, setComment] = useState("");

  const onSubmit = async () => {
    try {
      const createdComment = await createComment(postId, { text: comment });
      onCreateComment(createdComment);
      toast.success("Comment published successfully.", {
        position: "top-center",
      });
      setComment("");
    } catch (error) {}
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="" />
            <AvatarFallback className="text-m  bg-primary/10 text-primary">
              IT
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              rows={3}
              className="mb-3 resize-none"
            />
            <Button
              onClick={onSubmit}
              disabled={!comment || isSubmitting}
              size="sm"
            >
              {isSubmitting ? <Spinner /> : "Post Comment"}
            </Button>
            {error && (
              <p className="text-sm text-red-500 mt-1">
                {"Something went wrong. Please try again."}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentInputCard;
