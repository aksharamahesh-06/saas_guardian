const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const apiRequest = async (
  endpoint,
  options = {}
) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Request failed"
    );
  }

  return data;
};

export default apiRequest;