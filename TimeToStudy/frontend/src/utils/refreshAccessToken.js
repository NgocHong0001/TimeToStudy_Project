export async function refreshAccessToken() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/refresh-token`, {
      method: 'POST',
      credentials: 'include', // Include cookies in the request
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    return data.accessToken;
  } catch (err) {
    console.error("Token refresh error:", err);
    return null;
  }
}
