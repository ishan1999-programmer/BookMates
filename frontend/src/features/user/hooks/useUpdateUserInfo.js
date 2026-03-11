import { useState, useCallback } from "react";
import { updateUserInfo as updateUserInfoApi } from "../apis/user.api";

const useUpdateUserInfo = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const updateUserInfo = useCallback(async (updatedDetails) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await updateUserInfoApi(updatedDetails);
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { isSubmitting, error, updateUserInfo };
};

export default useUpdateUserInfo;
