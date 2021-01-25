import { useState, useEffect } from 'react';

export default function useFetchData(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const fetchData = async (url) => {
    setStatus('loading');

    try {
      const response = await fetch(url);
      const dataFromApi = await response.json();

      setData(dataFromApi);
      setStatus('resolved');
    } catch (error) {
      console.log(error);
      setError(error);
      setStatus('rejected');
    }
  };

  useEffect(() => {
    if (!url) {
      return;
    }

    fetchData(url);
  }, [url]);

  return [data, status, error];
}
