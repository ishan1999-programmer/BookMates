import { useCallback, useEffect, useRef, useState } from "react";
import { searchBooks as searchBooksApi } from "../apis/book.api";
import {
  addBook as addBookApi,
  removeBook as removeBookApi,
} from "@/features/read/apis/read.api";

const useSearchBooks = (searchQuery) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [submittingIds, setSubmittingIds] = useState({});
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const searchBooks = useCallback(async (query) => {
    setIsFetching(true);
    setError(null);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const newController = new AbortController();
    const signal = newController.signal;
    controllerRef.current = newController;
    try {
      const response = await searchBooksApi(query, signal);
      setData(response.data.data);
    } catch (error) {
      if (error.name !== "CanceledError") {
        setError(error);
      }
    } finally {
      if (newController === controllerRef.current) {
        setIsFetching(false);
      }
    }
  }, []);

  const addBook = useCallback(async (bookDetails) => {
    const { id: bookId } = bookDetails;
    setSubmittingIds((prev) => ({ ...prev, [bookId]: "adding" }));
    try {
      await addBookApi(bookDetails);
      setData((prev) =>
        prev.map((book) =>
          book.id === bookId ? { ...book, status: "want to read" } : book,
        ),
      );
    } catch (error) {
      throw error;
    } finally {
      setSubmittingIds((prev) => {
        const updated = { ...prev };
        delete updated[bookId];
        return updated;
      });
    }
  }, []);

  const removeBook = useCallback(async (bookId) => {
    setSubmittingIds((prev) => ({ ...prev, [bookId]: "removing" }));
    try {
      await removeBookApi(bookId);
      setData((prev) =>
        prev.map((book) =>
          book.id === bookId ? { ...book, status: "not added" } : book,
        ),
      );
    } catch (error) {
      throw error;
    } finally {
      setSubmittingIds((prev) => {
        const updated = { ...prev };
        delete updated[bookId];
        return updated;
      });
    }
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchBooks(searchQuery);
    } else {
      setData([]);
    }
  }, [searchQuery]);

  useEffect(
    () => () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    },
    [],
  );

  return {
    data,
    error,
    isFetching,
    submittingIds,
    searchBooks,
    addBook,
    removeBook,
  };
};

export default useSearchBooks;
