const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const fetchData = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const postData = async (endpoint, data) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error ||
      errorData.message ||
      'Network response was not ok'
    );
  }

  return response.json();
};

export const postFormData = async (endpoint, formData) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    const error = new Error(
      errorData.error ||
      errorData.message ||
      'Network response was not ok'
    );

    error.status = response.status;

    throw error;
  }

  return response.json();
};