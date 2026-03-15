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
    setData((prev) => ({ ...prev, isFollowRequestSent: true }));
    try {
      await sendFollowRequestApi(requestDetails);
    } catch (error) {
      setData((prev) => ({ ...prev, isFollowRequestSent: false }));
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const cancelFollowRequest = useCallback(async (followRequestId) => {
    setIsSubmitting(true);
    setData((prev) => ({ ...prev, isFollowRequestSent: false }));
    try {
      await cancelFollowRequestApi(followRequestId);
    } catch (error) {
      setData((prev) => ({ ...prev, isFollowRequestSent: true }));
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const followUser = useCallback(async (userId) => {
    setIsSubmitting(true);
    setData((prev) => ({
      ...prev,
      isFollowedByMe: true,
      followersCount: prev.followersCount + 1,
    }));
    try {
      await followUserApi(userId);
    } catch (error) {
      setData((prev) => ({
        ...prev,
        isFollowedByMe: false,
        followersCount: prev.followersCount - 1,
      }));
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const unfollowUser = useCallback(async (userId) => {
    setIsSubmitting(true);
    setData((prev) => ({
      ...prev,
      isFollowedByMe: false,
      followersCount: prev.followersCount - 1,
    }));
    try {
      await unfollowUserApi(userId);
    } catch (error) {
      setData((prev) => ({
        ...prev,
        isFollowedByMe: true,
        followersCount: prev.followersCount + 1,
      }));
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
