import { useState, useCallback } from 'react';
import axios from 'axios';

const useMutation = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const upsertData = async ({
    method,
    endpoint,
    data,
    needAuthorization = true
  }) => {
    console.log(response);
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

      const res = data
        ? await axios[method](endpoint, data, { headers })
        : await axios[method](endpoint, { headers });
      console.log(res.data.message);
      setResponse(res.data.message);
      console.log(response);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  return [{ response, loading, error }, upsertData];
};

export default useMutation;
