import { getUserFollowers } from "../apis/follow.api";
import { useState, useCallback, useEffect } from "react";

const useUserFollowers = (username) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserFollowers = useCallback(async (username) => {
    setIsFetching(true);
    setError(null);
    try {
      const response = await getUserFollowers(username);
      setData(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchUserFollowers(username);
  }, [username]);

  return {
    data,
    isFetching,
    fetchUserFollowers,
    error,
  };
};

export default useUserFollowers;
