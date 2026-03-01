import { useCallback, useState } from "react";
import { followUser as followUserApi } from "../apis/user.api";

const useFollowUser = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const followUser = useCallback(async (userId) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await followUserApi(userId);
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { isSubmitting, followUser, error };
};

export default useFollowUser;
