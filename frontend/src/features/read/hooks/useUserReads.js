import { useState, useEffect, useCallback } from "react";
import { getReads } from "../apis/read.api";

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

  useEffect(() => {
    getUserReads(username);
  }, [username]);

  return {
    data,
    error,
    isFetching,
    getUserReads,
  };
};

export default useUserReads;
