import { useState, useEffect, useCallback } from "react";
import { getNotifications, updateNotification } from "../apis/notification.api";

const useFetchNotifications = () => {
  const [data, setData] = useState({ notifications: [], notReadCount: 0 });
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    try {
      const response = await getNotifications();
      setData(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const markNotificationRead = useCallback(async (notificationId) => {
    setData((prev) => {
      const updatedData = {};
      updatedData.notReadCount = prev.notReadCount - 1;
      updatedData.notifications = prev.notifications.map((notification) =>
        notification._id === notificationId
          ? { ...notification, isRead: true }
          : notification,
      );
      return updatedData;
    });

    try {
      await updateNotification(notificationId);
    } catch (error) {
      setData((prev) => {
        const updatedData = {};
        updatedData.notReadCount = prev.notReadCount + 1;
        updatedData.notifications = prev.notifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: false }
            : notification,
        );
        return updatedData;
      });
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    data,
    error,
    isFetching,
    fetchNotifications,
    markNotificationRead,
  };
};

export default useFetchNotifications;
