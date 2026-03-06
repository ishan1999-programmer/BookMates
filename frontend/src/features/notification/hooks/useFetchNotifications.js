import { useState, useEffect, useCallback } from "react";
import { getNotifications, updateNotification } from "../apis/notification.api";

const useFetchNotifications = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    try {
      const response = await getNotifications();
      setData(response.data.data.notifications);
      setCount(response.data.data.notReadCount);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const markNotificationRead = useCallback(async (notificationId) => {
    setData((prev) =>
      prev.map((d) => (d._id === notificationId ? { ...d, isRead: true } : d)),
    );
    setCount((prev) => prev - 1);
    try {
      await updateNotification(notificationId);
    } catch (error) {
      setData((prev) =>
        prev.map((d) =>
          d._id === notificationId ? { ...d, isRead: false } : d,
        ),
      );
      setCount((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    data,
    error,
    isFetching,
    count,
    fetchNotifications,
    markNotificationRead,
  };
};

export default useFetchNotifications;
