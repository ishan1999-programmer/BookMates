import { useCallback, useState } from "react";
import { unfollowUser as unfollowUserApi } from "../apis/user.api";

const useUnfollowUser = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const unfollowUser = useCallback(async (userId) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await unfollowUserApi(userId);
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { isSubmitting, unfollowUser, error };
};

export default useUnfollowUser;
