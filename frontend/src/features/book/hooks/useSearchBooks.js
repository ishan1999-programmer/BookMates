import { useCallback, useEffect, useRef, useState } from "react";
import { searchBooks as searchBooksApi } from "../apis/book.api";

const useSearchBooks = (searchQuery) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
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

  return { data, error, isFetching, searchBooks };
};

export default useSearchBooks;
