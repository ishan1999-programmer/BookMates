import { useState, useEffect, useCallback } from "react";
import { getUser as getUserApi } from "../apis/user.api";

const useUserProfile = (username) => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  const getUser = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    try {
      const response = await getUserApi(username);
      const { data } = response.data;
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  }, [username]);

  useEffect(() => {
    getUser();
  }, [username]);

  return { data, isFetching, error, getUser };
};

export default useUserProfile;
