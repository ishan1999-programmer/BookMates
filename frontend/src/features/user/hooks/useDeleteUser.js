import { useState, useCallback } from "react";
import { deleteUser as deleteUserApi } from "../apis/user.api";

const useDeleteUser = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const deleteUser = useCallback(async (password) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await deleteUserApi(password);
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { isSubmitting, error, deleteUser };
};

export default useDeleteUser;
