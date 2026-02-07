import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BookOpen, Star, Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommentCard from "./CommentCard";
import CommentInputCard from "./CommentInputCard";

const PostCard = () => {
  const [showFullReview, setShowFullReview] = useState(false);
  const [isCommentsShow, setIsCommentsShow] = useState(false);
  let post = { isLiked: true, likes: 3, commentCount: 4 };

  const truncateReview = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  let review =
    "There were parts of this book that genuinely had me petrified. The eeriness and creepiness of the chapel that Adam and Amelia were staying in was captured brilliantly by the author. I always listen to music via my headphones whilst I read and there was more than one occasion I had to slip them off as I thought I heard someone creeping around my own cottage.";
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 pb-5 border-border border-b">
          <div className="flex gap-2 items-center">
            <Avatar className="w-10 h-10">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary">
                IT
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-foreground">Ishan Tripathi</h4>
              <p className="text-sm text-muted-foreground">
                @mystery_reader • 5 hours ago
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-16 h-24 bg-muted rounded flex items-center justify-center flex-shrink-0">
              {false ? (
                <img
                  src=""
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-lg text-foreground mb-1">
                Rock Paper Scissors
              </h3>
              <p className="text-muted-foreground mb-2">by Alice Feeney</p>
              <p className="text-sm text-muted-foreground mb-2">Mystery</p>
              <div className="flex gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          </div>
          <div>
            <p className="text-foreground leading-relaxed">
              {showFullReview ? review : truncateReview(review)}
            </p>
            {review.length > 200 && (
              <button
                onClick={() => setShowFullReview((prev) => !prev)}
                className="text-primary hover:text-primary/80 text-sm font-medium mt-2"
              >
                {showFullReview ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 pt-3 pb-3">
          <Button
            variant="ghost"
            onClick
            className={`flex items-center gap-2 ${
              post.isLiked
                ? "text-red-500 hover:text-red-600"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Heart
              className={`h-5 w-5 ${post.isLiked ? "fill-current" : ""}`}
            />
            <span>{post.likes}</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setIsCommentsShow((prev) => !prev)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{post.commentCount}</span>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </Button>
        </div>
        {isCommentsShow && (
          <div className="flex flex-col border-border border-t pt-5">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Comments (2)
            </h3>
            <CommentInputCard />
            <div className="flex flex-col gap-5 mt-5  h-96  overflow-scroll">
              <CommentCard />
              <CommentCard />
              <CommentCard />
              <CommentCard />
              <CommentCard />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
