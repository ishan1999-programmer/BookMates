import { useState, useEffect, useCallback } from "react";
import { getReads, updateBook } from "../apis/read.api";

const useUserReads = (username) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const getUserReads = useCallback(async (username) => {
    setIsFetching(true);
    setError(null);
    try {
      const response = await getReads(username);
      setData(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const updateCurrentPage = useCallback(async (readId, updatedDetails) => {
    const { oldPage, newPage } = updatedDetails;
    setData((prev) =>
      prev.map((book) =>
        book._id === readId ? { ...book, currentPage: newPage } : book,
      ),
    );
    try {
      await updateBook(readId, { currentPage: newPage });
    } catch (error) {
      setData((prev) =>
        prev.map((book) =>
          book._id === readId ? { ...book, currentPage: oldPage } : book,
        ),
      );
      throw error;
    }
  }, []);

  useEffect(() => {
    getUserReads(username);
  }, [username]);

  return {
    data,
    error,
    isFetching,
    getUserReads,
    updateCurrentPage,
  };
};

export default useUserReads;
