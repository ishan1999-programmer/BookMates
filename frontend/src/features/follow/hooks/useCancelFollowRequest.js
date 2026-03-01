import { useState, useCallback } from "react";
import { cancelFollowRequest as cancelFollowRequestApi } from "../apis/api";

const useCancelFollowRequest = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const cancelFollowRequest = useCallback(async (followRequestId) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await cancelFollowRequestApi(followRequestId);
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { isSubmitting, error, cancelFollowRequest };
};

export default useCancelFollowRequest;
