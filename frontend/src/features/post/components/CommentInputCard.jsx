import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CommentInputCard = () => {
  const [comment, SetComment] = useState("");
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
              onChange={(e) => SetComment(e.target.value)}
              placeholder="Add a comment..."
              rows={3}
              className="mb-3 resize-none"
            />
            <Button disabled={!comment} size="sm">
              Post Comment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentInputCard;
