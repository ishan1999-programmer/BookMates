import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import SearchBooksCard from "../components/SearchBooksCard";
import SearchBooksCardSkeleton from "../components/SearchBooksCardSkeleton";
import NoBooks from "../components/NoBooks";
import ErrorBooks from "../components/ErrorBooks";
import useSearchBooks from "../hooks/useSearchBooks";
import useDebounce from "../../../hooks/useDebounce";

const SearchBook = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery);
  const {
    data: books,
    error,
    isFetching,
    searchBooks: reFetchBooks,
  } = useSearchBooks(debouncedSearchQuery);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setOpen(value.trim().length > 0);
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex-col gap-2">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Discover Books
        </h1>
        <p className="text-muted-foreground text-lg">
          Search millions of books from around the world
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="relative">
          <Search className="absolute left-2 top-1/4 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search books by title or author..."
            className="pl-9 pr-8 h-9 bg-muted/50"
          />
        </div>
        {open && (
          <Card>
            <CardContent className="overflow-auto">
              {isFetching ? (
                <>
                  <SearchBooksCardSkeleton />
                  <SearchBooksCardSkeleton />
                  <SearchBooksCardSkeleton />
                  <SearchBooksCardSkeleton />
                  <SearchBooksCardSkeleton />
                  <SearchBooksCardSkeleton />
                </>
              ) : error ? (
                <ErrorBooks
                  reFetch={reFetchBooks}
                  query={debouncedSearchQuery}
                />
              ) : books.length === 0 ? (
                <NoBooks />
              ) : (
                <>
                  {books.map((book) => (
                    <SearchBooksCard
                      key={book.id}
                      title={book.title}
                      authors={book.authors}
                      cover={book.cover}
                      link={book.link}
                    />
                  ))}
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchBook;
