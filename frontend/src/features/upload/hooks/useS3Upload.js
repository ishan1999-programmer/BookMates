import { useState, useCallback } from "react";
import { getPreSignedUrl } from "../apis/upload.api";

const useS3Upload = () => {
  const [data, setData] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = useCallback(async (file) => {
    setIsUploading(true);
    setError(null);
    try {
      const response = await getPreSignedUrl({ fileType: file.type });
      const { uploadUrl, fileUrl } = response.data;
      await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
      setData(fileUrl);
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { data, isUploading, uploadFile };
};

export default useS3Upload;
