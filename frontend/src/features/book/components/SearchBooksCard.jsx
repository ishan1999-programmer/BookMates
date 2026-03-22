import { Link } from "react-router-dom";
import { BookOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchBooksCard = ({ title, authors, cover }) => {
  return (
    <Link to="/">
      <div
        className={`flex justify-between pb-2 pt-3 pl-2 pr-4 border-b border-border  hover:bg-accent/50 transition-colors`}
      >
        <div className="flex gap-3">
          <div className="w-12 h-16 bg-muted rounded flex items-center justify-center flex-shrink-0">
            {cover ? (
              <img
                src={cover}
                alt=""
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <div className="flex flex-col">
            <p className="font-medium text-sm wrap-break-word w-48">{title}</p>
            <p className="text-xs text-primary wrap-break-word w-48">
              {authors.length > 0 ? authors.join(",") : ""}
            </p>
          </div>
        </div>
        <Button variant="outline">
          <Heart /> Read
        </Button>
      </div>
    </Link>
  );
};

export default SearchBooksCard;
