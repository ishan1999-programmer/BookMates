import { getFeed } from "../apis/post.api";
import { useState, useCallback, useEffect } from "react";
import { like as likeApi, unlike as unlikeApi } from "../apis/like.api";

const useFeed = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const fetchNext = useCallback(async () => {
    if (!hasMore || isFetching) {
      return;
    }
    setIsFetching(true);
    setError(null);
    try {
      const response = await getFeed(cursor);
      const { posts, hasMore, nextCursor } = response.data.data;
      setPosts((prev) => [...prev, ...posts]);
      setHasMore(hasMore);
      setCursor(nextCursor);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  }, [cursor, hasMore, isFetching]);

  const toggleLike = useCallback(async (postId, isLiked) => {
    setPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? {
              ...post,
              isLikedByMe: !post.isLikedByMe,
              likesCount: post.isLikedByMe ? post.likesCount - 1 : post.likesCount + 1,
            }
          : post,
      ),
    );
    try {
      const response = isLiked
        ? await unlikeApi(postId)
        : await likeApi(postId);
    } catch (error) {
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                isLikedByMe: !post.isLikedByMe,
                likesCount: post.isLikedByMe
                  ? post.likesCount - 1
                  : post.likesCount + 1,
              }
            : post,
        ),
      );
    }
  }, []);

  useEffect(() => {
    fetchNext();
  }, []);

  return {
    posts,
    hasMore,
    isFetching,
    fetchNext,
    error,
    toggleLike,
  };
};

export default useFeed;
