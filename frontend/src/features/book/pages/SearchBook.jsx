import React from "react";
import SearchBooksCard from "../components/SearchBooksCard";

const SearchBook = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex-col gap-2">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Discover Books
        </h1>
        <p className="text-muted-foreground text-lg">
          Search millions of books from around the world
        </p>
        <SearchBooksCard />
      </div>
    </div>
  );
};

export default SearchBook;
