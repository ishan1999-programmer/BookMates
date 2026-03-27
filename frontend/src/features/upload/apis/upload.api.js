import axiosInstance from "@/lib/axiosInstance";

const getPreSignedUrl = (fileDetails) =>
  axiosInstance.post("/uploads/generate-upload-url", fileDetails);

export  { getPreSignedUrl };
