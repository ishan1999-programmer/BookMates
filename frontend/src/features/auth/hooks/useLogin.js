import { useState, useCallback } from "react";
import { login as loginApi } from "../apis/auth.api";

const useLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = useCallback(async (userCredentials) => {
    setIsSubmitting(true);
    try {
      const response = await loginApi(userCredentials);
      return response.data.data;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { isSubmitting, login };
};

export default useLogin;
