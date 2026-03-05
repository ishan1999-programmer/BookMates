import { useState, useCallback, useEffect } from "react";
import { getPost } from "../apis/post.api";
import { like, unlike } from "../apis/like.api";

const usePost = (postId) => {
  const [data, setData] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = useCallback(async (postId) => {

    setIsFetching(true);
    setError(null);
    try {
      
      
      const response = await getPost(postId);
      setData(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const toggleLike = useCallback(async (postId, isLiked) => {
    setData((prev) => ({
      ...prev,
      isLikedByMe: !prev.isLikedByMe,
      likesCount: prev.isLikedByMe ? prev.likesCount - 1 : prev.likesCount + 1,
    }));
    try {
      if (isLiked) {
        await unlike(postId);
      } else {
        await like(postId);
      }
    } catch (error) {
      setData((prev) => ({
        ...prev,
        isLikedByMe: !prev.isLikedByMe,
        likesCount: prev.isLikedByMe
          ? prev.likesCount - 1
          : prev.likesCount + 1,
      }));
    }
  }, []);

  const incrementCommentsCount = useCallback((postId) => {
    setData((prev) => ({ ...prev, commentsCount: prev.commentsCount + 1 }));
  }, []);

  useEffect(() => {
    fetchPost(postId);
  }, [postId]);

  return {
    data,
    isFetching,
    error,
    fetchPost,
    toggleLike,
    incrementCommentsCount,
  };
};

export default usePost;
