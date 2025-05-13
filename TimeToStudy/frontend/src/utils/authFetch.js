import { refreshAccessToken } from './refreshAccessToken';

async function authorizedFetch(url, options = {}) {
  let token = localStorage.getItem('accessToken');

  const finalOptions = {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  };

  let response = await fetch(url, finalOptions);

  if (response.status === 401) {  
    // Access token expired, try to refresh it
    const newToken = await refreshAccessToken();

    if (newToken) {
      console.log('🥂 New token received:', newToken);
      finalOptions.headers.Authorization = `Bearer ${newToken}`;
      response = await fetch(url, finalOptions); // Retry the request with the new token
    }
  }

  return response;
}

export default authorizedFetch;
