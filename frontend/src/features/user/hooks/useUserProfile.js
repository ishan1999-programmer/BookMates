import { useState, useEffect, useCallback } from "react";
import { getUser as getUserApi } from "../apis/user.api";
import {
  sendFollowRequest as sendFollowRequestApi,
  cancelFollowRequest as cancelFollowRequestApi,
} from "@/features/follow/apis/follow.api";
import {
  followUser as followUserApi,
  unfollowUser as unfollowUserApi,
} from "../apis/user.api";

const useUserProfile = (username) => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const getUser = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    try {
      const response = await getUserApi(username);
      const { data } = response.data;
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  }, [username]);

  const sendFollowRequest = useCallback(async (requestDetails) => {
    setIsSubmitting(true);

    try {
      const response = await sendFollowRequestApi(requestDetails);
      const { _id: followRequestId } = response.data.data;
      setData((prev) => ({
        ...prev,
        isFollowRequestSent: true,
        followRequestId: followRequestId,
      }));
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const cancelFollowRequest = useCallback(async (followRequestId) => {
    setIsSubmitting(true);
    try {
      await cancelFollowRequestApi(followRequestId);
      setData((prev) => ({
        ...prev,
        isFollowRequestSent: false,
        followRequestId: null,
      }));
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const followUser = useCallback(async (userId) => {
    setIsSubmitting(true);
    try {
      await followUserApi(userId);
      setData((prev) => ({
        ...prev,
        isFollowedByMe: true,
        followersCount: prev.followersCount + 1,
      }));
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const unfollowUser = useCallback(async (userId) => {
    setIsSubmitting(true);
    try {
      await unfollowUserApi(userId);
      setData((prev) => ({
        ...prev,
        isFollowedByMe: false,
        followersCount: prev.followersCount - 1,
      }));
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [username]);

  return {
    data,
    isFetching,
    error,
    getUser,
    sendFollowRequest,
    cancelFollowRequest,
    followUser,
    unfollowUser,
    isSubmitting,
  };
};

export default useUserProfile;
