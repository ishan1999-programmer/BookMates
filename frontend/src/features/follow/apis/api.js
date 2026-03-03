import axiosInstance from "@/lib/axiosInstance";

const sendFollowRequest = (requestDetails) =>
  axiosInstance.post("/follow-requests", requestDetails);

const cancelFollowRequest = (followRequestId) =>
  axiosInstance.delete(`/follow-requests/${followRequestId}`);

const acceptFollowRequest = (followRequestId) =>
  axiosInstance.put(`/follow-requests/${followRequestId}/accept`);

const rejectFollowRequest = (followRequestId) =>
  axiosInstance.put(`/follow-requests/${followRequestId}/reject`);

const getFollowRequests = () => axiosInstance.get("/follow-requests");

export {
  sendFollowRequest,
  cancelFollowRequest,
  acceptFollowRequest,
  rejectFollowRequest,
  getFollowRequests,
};
