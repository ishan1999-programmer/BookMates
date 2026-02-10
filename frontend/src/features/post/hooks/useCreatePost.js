import { useState, useCallback } from "react";
import { createPost as createPostApi } from "../apis/post.api";

const useCreatePost = () => {
  const [isSubmitting, setIsSubmistting] = useState(false);

  const createPost = useCallback(async (postData) => {
    setIsSubmistting(true);
    try {
      const response = await createPostApi(postData);
      return response.data.data;
    } finally {
      setIsSubmistting(false);
    }
  }, []);

  return { isSubmitting, createPost };
};

export default useCreatePost;
