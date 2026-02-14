import { getFeed } from "../apis/post.api";
import { useState, useCallback, useEffect } from "react";

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

  useEffect(() => {
    fetchNext();
  }, []);

  return { posts, hasMore, isFetching, fetchNext, error };
};

export default useFeed;
