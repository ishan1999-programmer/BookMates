import { getUserFollowings } from "../apis/follow.api";
import { useState, useCallback, useEffect } from "react";
import {
  sendFollowRequest as sendFollowRequestApi,
  cancelFollowRequest as cancelFollowRequestApi,
} from "../apis/follow.api";
import {
  followUser as followUserApi,
  unfollowUser as unfollowUserApi,
} from "../../user/apis/user.api";

const useUserFollowings = (username) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [submittingIds, setSubmittingIds] = useState([]);

  const fetchUserFollowings = useCallback(async (username) => {
    setIsFetching(true);
    setError(null);
    try {
      const response = await getUserFollowings(username);
      setData(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const sendFollowRequest = useCallback(async (requestDetails, userId) => {
    setSubmittingIds((prev) => ({ ...prev, [userId]: true }));
    try {
      const response = await sendFollowRequestApi(requestDetails);
      const { _id: followRequestId } = response.data.data;
      setData((prev) =>
        prev.map((user) => {
          if (user._id === userId) {
            return {
              ...user,
              isFollowRequestSent: true,
              followRequestId: followRequestId,
            };
          } else {
            return user;
          }
        }),
      );
    } catch (error) {
      throw error;
    } finally {
      setSubmittingIds((prev) => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
    }
  }, []);

  const cancelFollowRequest = useCallback(async (followRequestId, userId) => {
    setSubmittingIds((prev) => ({ ...prev, [userId]: true }));
    try {
      await cancelFollowRequestApi(followRequestId);
      setData((prev) =>
        prev.map((user) => {
          if (user._id === userId) {
            return {
              ...user,
              isFollowRequestSent: false,
              followRequestId: null,
            };
          } else {
            return user;
          }
        }),
      );
    } catch (error) {
      throw error;
    } finally {
      setSubmittingIds((prev) => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
    }
  }, []);

  const followUser = useCallback(async (userId) => {
    setSubmittingIds((prev) => ({ ...prev, [userId]: true }));
    try {
      await followUserApi(userId);
      setData((prev) =>
        prev.map((user) => {
          if (user._id === userId) {
            return {
              ...user,
              isFollowedByMe: true,
            };
          } else {
            return user;
          }
        }),
      );
    } catch (error) {
      throw error;
    } finally {
      setSubmittingIds((prev) => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
    }
  }, []);

  const unfollowUser = useCallback(async (userId, isOwnProfile) => {
    setSubmittingIds((prev) => ({ ...prev, [userId]: true }));
    try {
      await unfollowUserApi(userId);
      setData((prev) =>
        isOwnProfile
          ? prev.filter((user) => user._id !== userId)
          : prev.map((user) => {
              if (user._id === userId) {
                return {
                  ...user,
                  isFollowedByMe: false,
                };
              } else {
                return user;
              }
            }),
      );
    } catch (error) {
      throw error;
    } finally {
      setSubmittingIds((prev) => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
    }
  }, []);

  useEffect(() => {
    fetchUserFollowings(username);
  }, [username]);

  return {
    data,
    isFetching,
    fetchUserFollowings,
    error,
    submittingIds,
    sendFollowRequest,
    cancelFollowRequest,
    followUser,
    unfollowUser,
  };
};

export default useUserFollowings;
