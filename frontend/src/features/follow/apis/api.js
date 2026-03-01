import axiosInstance from "@/lib/axiosInstance";

const sendFollowRequest = (requestDetails) =>
  axiosInstance.post("/follow-requests", requestDetails);

const cancelFollowRequest = (followRequestId) =>
  axiosInstance.delete(`/follow-requests/${followRequestId}`);

export { sendFollowRequest, cancelFollowRequest };
