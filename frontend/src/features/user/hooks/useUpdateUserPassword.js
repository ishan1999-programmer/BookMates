import { useState, useCallback } from "react";
import { updateUserPassword as updateUserPasswordApi } from "../apis/user.api";

const useUpdateUserPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const updateUserPassword = useCallback(async (updatedPasswordDetails) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await updateUserPasswordApi(updatedPasswordDetails);
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { isSubmitting, error, updateUserPassword };
};

export default useUpdateUserPassword;
