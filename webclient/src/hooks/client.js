import M from 'materialize-css';

export async function client(endpoint, { body, ...customConfig } = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `${token}`;
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return await fetch(`/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      logout();
      window.location.assign('/login');
      return;
    }

    const data = await response.json();
    if (response.ok) {
      return data.message;
    } else {
      if (customConfig.showError) {
        console.log(data);
        M.toast({
          html: `<div>Error fetching data! ${data}!</div>`,
          classes: 'red rounded center top'
        });
      }
      return Promise.reject(data);
    }
  });
}

function logout() {
  localStorage.removeItem('token');
}
