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
    dataType = 'application/json',
    data,
    needAuthorization = true,
    auth,
    showToast = true,
    successMessage,
    errorMessage,
    pushTo
  }) => {
    setError(null);
    setLoading(true);

    try {
      let headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': dataType
      };

      if (needAuthorization) {
        const token = auth ? auth : localStorage.getItem('token');
        headers = {
          ...headers,
          Authorization: `${token}`
        };
      }

      const res = data
        ? await axios[method](endpoint, data, { headers })
        : await axios[method](endpoint, { headers });

      setResponse(res.data.message);

      if (showToast) {
        if (successMessage) {
          M.toast({
            html: `<div>${successMessage}</div>`,
            classes: 'teal rounded center top'
          });
        } else {
          M.toast({
            html: `<div>${res.data.message}!</div>`,
            classes: 'teal rounded center top'
          });
        }
      }

      if (pushTo) {
        setTimeout(() => {
          window.location.replace(pushTo);
        }, 1000);
      }
    } catch (e) {
      if (e.response) {
        setError(e.response.data.error.message);
      } else if (e.request) {
        setError(e.request);
      } else {
        setError(e);
      }

      if (showToast) {
        if (e.response) {
          M.toast({
            html: `<div>${e.response.data.error.message}!</div>`,
            classes: 'red rounded center top'
          });
        } else if (e.request) {
          M.toast({
            html: `<div>No response was received! ${e.request}!</div>`,
            classes: 'red rounded center top'
          });
        } else {
          M.toast({
            html: `<div>Something went wrong! ${e}!</div>`,
            classes: 'red rounded center top'
          });
        }
      }
    }
    setLoading(false);
  };
  // console.log({ response, loading, error });
  return [{ response, loading, error }, useCallback(upsertData, [])];
};

export default useMutation;
