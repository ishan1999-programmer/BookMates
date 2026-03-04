import axiosInstance from "@/lib/axiosInstance";

const getNotifications = () => axiosInstance.get("/notifications");

export { getNotifications };

