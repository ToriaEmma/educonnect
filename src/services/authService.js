import { post } from './api';

const ENDPOINTS = {
  REGISTER_STUDENT: '/auth/register/student',
  REGISTER_TEACHER: '/auth/register/teacher',
  REGISTER_SCHOOL: '/auth/register/school',
  LOGIN: '/auth/login',
  ME: '/auth/me'
};

// Store token in localStorage
export function setToken(token) {
  localStorage.setItem('authToken', token);
}

export function getToken() {
  return localStorage.getItem('authToken');
}

export function removeToken() {
  localStorage.removeItem('authToken');
}

// Register Student
export async function registerStudent(data) {
  try {
    const response = await post(ENDPOINTS.REGISTER_STUDENT, data);
    if (response.token) {
      setToken(response.token);
    }
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

// Register Teacher
export async function registerTeacher(data) {
  try {
    const response = await post(ENDPOINTS.REGISTER_TEACHER, data);
    if (response.token) {
      setToken(response.token);
    }
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

// Register School
export async function registerSchool(data) {
  try {
    const response = await post(ENDPOINTS.REGISTER_SCHOOL, data);
    if (response.token) {
      setToken(response.token);
    }
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

// Login
export async function login(email, password) {
  try {
    const response = await post(ENDPOINTS.LOGIN, { email, password });
    if (response.token) {
      setToken(response.token);
    }
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// Logout
export function logout() {
  removeToken();
}

// Check if user is authenticated
export function isAuthenticated() {
  return !!getToken();
}
