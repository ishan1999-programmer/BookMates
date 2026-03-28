import { useState, useCallback } from "react";
import { getPreSignedUrl } from "../apis/upload.api";
import axios from "axios";

const useS3Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const uploadFile = useCallback(async (file) => {
    setIsUploading(true);
    setError(null);
    setProgress(0);

    try {
      const response = await getPreSignedUrl({ fileType: file.type });
      const { uploadUrl, fileUrl } = response.data;
      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setProgress(percent);
        },
      });
      return fileUrl;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { isUploading, uploadFile, error, progress };
};

export default useS3Upload;
