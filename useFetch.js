import { useCallback, useState } from 'react';

const useFetch = (sendResponse) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method,
          headers: requestConfig.headers,
          body: JSON.stringify(requestConfig.body)
        });

        if (!response.ok) {
          throw new Error('Faild to call url. Try again.');
        }
        const data = await response.json();
        sendResponse(data);
      } catch (err) {
        setError(err);
        setLoading(false);
        throw new Error('Something went wrong.');
      }
      setLoading(false);
    },
    [sendResponse]
  );

  return {
    loading,
    error,
    sendRequest,
  };
};

export default useFetch;
