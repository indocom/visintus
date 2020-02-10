import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const useFetch = ({ endpoint, needAuthorization = true }) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setLoading(true);
      try {
        let headers = {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        };

        if (needAuthorization) {
          const token = localStorage.getItem('token');
          headers = {
            ...headers,
            Authorization: `${token}`
          };
        }

        const res = await axios.get(endpoint, {
          headers
        });

        console.log(res.data.message);
        setResponse(res.data.message);
        setIsStale(false);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [isStale]);

  return [{ response, loading, error, isStale }, useCallback(setIsStale, [])];
};

export default useFetch;
