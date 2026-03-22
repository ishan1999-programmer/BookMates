import { Link } from "react-router-dom";
import { BookOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchBooksCard = ({ title, authors, cover, link }) => {
  return (
    <div
      className={`flex justify-between pb-2 pt-3 pl-2 pr-4 border-b border-border`}
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
          <a
            href={link}
            target="_blank"
            className="font-medium text-sm wrap-break-word w-48 hover:text-muted-foreground hover:underline cursor-pointer"
          >
            {title}
          </a>
          <p className="text-xs text-primary wrap-break-word w-48">
            {authors.length > 0 ? authors.join(",") : ""}
          </p>
        </div>
      </div>
      <Button variant="outline">
        <Heart /> Want to Read
      </Button>
    </div>
  );
};

export default SearchBooksCard;
