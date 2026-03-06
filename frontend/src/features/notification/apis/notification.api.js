import axiosInstance from "@/lib/axiosInstance";

const getNotifications = () => axiosInstance.get("/notifications");

const updateNotification = (notificationId) =>
  axiosInstance.put(`notifications/${notificationId}`);

export { getNotifications, updateNotification };
