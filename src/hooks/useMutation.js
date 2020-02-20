import { useState, useCallback } from 'react';
import axios from 'axios';
import M from 'materialize-css';

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
      if (e.response) {
        setError(e.response.data.errors.message);
        M.toast({
          html: `<div>Update data failed! ${e.response.data.errors.message}!</div>`,
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

  return [{ response, loading, error }, useCallback(upsertData, [])];
};

export default useMutation;
