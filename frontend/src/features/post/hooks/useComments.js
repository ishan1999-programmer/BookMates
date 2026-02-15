import { getComments } from "../apis/comment.api";
import { useState, useCallback, useEffect } from "react";

const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchNext = useCallback(async () => {
    if (isFetching || !hasMore) {
      return;
    }
    setIsFetching(true);
    setError(null);
    try {
      const response = await getComments(postId, cursor);
      const { hasMore, nextCursor, comments } = response.data.data;
      setComments((prev) => [...prev, ...comments]);
      setCursor(nextCursor);
      setHasMore(hasMore);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  }, [isFetching, hasMore, cursor, postId]);

  const prependComment = useCallback(
    (newComment) => setComments((prev) => [newComment, ...prev]),
    [],
  );

  return { comments, isFetching, error, hasMore, fetchNext, prependComment };
};

export default useComments;
