import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import M from 'materialize-css';

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
        if (e.response) {
          setError(e.response.data.error.message);
          M.toast({
            html: `<div>Error fetching data! ${e.response.data.error.message}!</div>`,
            classes: 'red rounded center top'
          });
        } else if (e.request) {
          setError(e.request);
          M.toast({
            html: `<div>No response was received! ${e.request}!</div>`,
            classes: 'red rounded center top'
          });
        } else {
          setError(e);
          M.toast({
            html: `<div>Something went wrong! ${e}!</div>`,
            classes: 'red rounded center top'
          });
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [isStale]);

  return [{ response, loading, error, isStale }, useCallback(setIsStale, [])];
};

export default useFetch;
