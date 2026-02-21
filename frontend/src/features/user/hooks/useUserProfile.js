import { useState, useEffect, useCallback } from "react";
import { getUser as getUserApi } from "../apis/user.api";

const useUserProfile = (username) => {
  const [userData, setUserData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  const getUser = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    try {
      const response = await getUserApi(username);
      const { data } = response.data;
      setUserData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  }, [username]);

  useEffect(() => {
    getUser();
  }, [username]);

  return { userData, isFetching, error, getUser };
};

export default useUserProfile;
