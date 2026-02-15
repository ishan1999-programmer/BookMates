import { useState, useCallback } from "react";
import { createPost as createPostApi } from "../apis/post.api";

const useCreatePost = () => {
  const [isSubmitting, setIsSubmistting] = useState(false);
  const [error, setError] = useState(null);

  const createPost = useCallback(async (postData) => {
    setIsSubmistting(true);
    try {
      await createPostApi(postData);
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsSubmistting(false);
    }
  }, []);

  return { isSubmitting, createPost, error };
};

export default useCreatePost;
