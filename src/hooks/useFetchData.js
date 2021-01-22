import { useState, useEffect } from 'react';

export default function useFetchData(url) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(url);
      const dataFromApi = await response.json();

      setData(dataFromApi);
    } catch (error) {
      console.log(error);
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return [{ data, isLoading, error }, setError];
}
