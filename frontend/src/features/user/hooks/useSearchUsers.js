import { useCallback, useEffect, useRef, useState } from "react";
import { searchUsers as searchUsersApi } from "../apis/user.api";

const useSearchUsers = (searchQuery) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const searchUsers = useCallback(async (query) => {
    setIsFetching(true);
    setError(null);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const newController = new AbortController();
    const signal = newController.signal;
    controllerRef.current = newController;
    try {
      const response = await searchUsersApi(query, signal);
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
      searchUsers(searchQuery);
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

  return { data, error, isFetching, searchUsers };
};



export default useSearchUsers;
