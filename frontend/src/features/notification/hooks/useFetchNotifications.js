import { useState, useEffect, useCallback } from "react";
import { getNotifications } from "../apis/notification.api";

const useFetchNotifications = () => {
  const [data, setData] = useState([]);
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

  useEffect(() => {
    fetchNotifications();
  }, []);

  return { data, error, isFetching, fetchNotifications };
};

export default useFetchNotifications;
