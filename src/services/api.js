// API Base URL - change based on environment
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API Endpoints
export const ENDPOINTS = {
  // Teachers
  TEACHERS: '/teachers',
  TEACHER_BY_ID: (id) => `/teachers/${id}`,
  
  // Students
  STUDENTS: '/students',
  STUDENT_BY_ID: (id) => `/students/${id}`,
  
  // Schools
  SCHOOLS: '/schools',
  SCHOOL_BY_ID: (id) => `/schools/${id}`,
  
  // Seed
  SEED: '/seed'
};

// Fetch wrapper with error handling
export async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// GET request
export async function get(endpoint) {
  return fetchAPI(endpoint, { method: 'GET' });
}

// POST request
export async function post(endpoint, data) {
  return fetchAPI(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

// PATCH request
export async function patch(endpoint, data) {
  return fetchAPI(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}

// DELETE request
export async function del(endpoint) {
  return fetchAPI(endpoint, { method: 'DELETE' });
}
