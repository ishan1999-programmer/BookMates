import { useState, useCallback } from "react";
import { createComment as createCommentApi } from "../apis/comment.api";

const useCreateComment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const createComment = useCallback(async (postId, commentDetails) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await createCommentApi(postId, commentDetails);
      return response.data.data;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { isSubmitting, error, createComment };
};

export default useCreateComment;
