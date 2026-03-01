import { useState, useCallback } from "react";
import { sendFollowRequest as sendFollowRequestApi } from "../apis/api";

const useSendFollowRequest = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const sendFollowRequest = useCallback(async (requestDetails) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await sendFollowRequestApi(requestDetails);
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { isSubmitting, error, sendFollowRequest };
};

export default useSendFollowRequest;
