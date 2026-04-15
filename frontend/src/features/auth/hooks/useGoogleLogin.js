import { useState, useCallback } from "react";
import { googleLogin as googleLoginApi } from "../apis/auth.api";

const useGoogleLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const googleLogin = useCallback(async (token) => {
    setIsSubmitting(true);
    try {
      const response = await googleLoginApi(token);
      return response.data.data;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { isSubmitting, googleLogin };
};

export default useGoogleLogin;
