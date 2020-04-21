import M from 'materialize-css';

// customConfig params
// - headers
// - method
// - body : will be JSONified.
// - file (There is some unique things about files)!
// - showSuccess : boolean
// - showError : boolean
// - onSuccess : fn
// - redirecTo: string (starting with /)

export async function client(endpoint, { body, file, ...customConfig } = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `${token}`;
  }

  const config = {
    method: customConfig.method ?? (body || file ? 'POST' : 'GET'),
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };

  if (file) {
    config.body = file;
    delete config.headers['Content-Type'];
  }

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
      if (customConfig.showSuccess) {
        M.toast({
          html: `<div>${data.message}</div>`,
          classes: 'teal rounded center top'
        });
      }

      if (customConfig.redirectTo) {
        window.location.assign(customConfig.redirectTo);
        return;
      }

      if (
        customConfig.onSuccess &&
        typeof customConfig.onSuccess === 'function'
      ) {
        customConfig.onSuccess();
      }

      return data?.message;
    } else {
      if (customConfig.showError) {
        M.toast({
          html: `<div>${data?.error?.message}!</div>`,
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
