import { get, post, ENDPOINTS } from './api';

export async function getAllStudents() {
  try {
    const response = await get(ENDPOINTS.STUDENTS);
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch students:', error);
    return [];
  }
}

export async function getStudentById(id) {
  try {
    const response = await get(ENDPOINTS.STUDENT_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch student:', error);
    return null;
  }
}

export async function createStudent(data) {
  return post(ENDPOINTS.STUDENTS, data);
}
