import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, { cancelRequest = false } = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    const controller = cancelRequest ? new AbortController() : null;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const response = await axios.get(url, {
          signal: controller?.signal,
        });
        setError(null);
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) return; // Ignore canceled requests
        setData(null);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to cancel the request if needed
    return () => {
      if (controller) controller.abort();
    };
  }, [url, cancelRequest]); // Re-run when url or cancelRequest changes

  return { data, loading, error };
};

export default useFetch;
