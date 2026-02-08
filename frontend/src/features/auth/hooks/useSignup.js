import { useState, useCallback } from "react";
import { signup as signupApi } from "../apis/auth.api";

const useSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signup = useCallback(async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await signupApi(userData);
      return response.data.data;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { isSubmitting, signup };
};

export default useSignup;
