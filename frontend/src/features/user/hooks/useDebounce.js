import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedQuery(value), 300);
    
    return () => clearTimeout(timerId);
  }, [value]);

  return debouncedQuery;
};

export default useDebounce;
