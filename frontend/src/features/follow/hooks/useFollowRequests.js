import { useState, useCallback, useEffect } from "react";
import {
  getFollowRequests,
  acceptFollowRequest as acceptFollowRequestApi,
  rejectFollowRequest as rejectFollowRequestApi,
} from "../apis/api";

const useFollowRequests = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmittingIds, setIsSubmittingIds] = useState({});

  const fetchFollowRequets = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    try {
      const response = await getFollowRequests();
      setData(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const acceptFollowRequest = useCallback(async (followRequestId) => {
    setError(null);
    setIsSubmittingIds((prev) => ({ ...prev, [followRequestId]: "accepting" }));
    try {
      await acceptFollowRequestApi(followRequestId);
      setData((prev) => prev.filter((d) => d._id !== followRequestId));
    } catch (error) {
      throw error;
    } finally {
      setIsSubmittingIds((prev) => {
        const updated = { ...prev };
        delete updated[followRequestId];
        return updated;
      });
    }
  }, []);

  const rejectFollowRequest = useCallback(async (followRequestId) => {
    setError(null);
    setIsSubmittingIds((prev) => ({ ...prev, [followRequestId]: "rejecting" }));

    try {
      await rejectFollowRequestApi(followRequestId);
      setData((prev) => prev.filter((d) => d._id !== followRequestId));
    } catch (error) {
      throw error;
    } finally {
      setIsSubmittingIds((prev) => {
        const updated = { ...prev };
        delete updated[followRequestId];
        return updated;
      });
    }
  }, []);

  useEffect(() => {
    fetchFollowRequets();
  }, []);

  return {
    data,
    error,
    isFetching,
    isSubmittingIds,
    fetchFollowRequets,
    acceptFollowRequest,
    rejectFollowRequest,
  };
};

export default useFollowRequests;
