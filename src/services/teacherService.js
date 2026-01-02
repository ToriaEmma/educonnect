import { get, post, ENDPOINTS } from './api';

export async function getAllTeachers(filters = {}) {
  try {
    let endpoint = ENDPOINTS.TEACHERS;
    const params = new URLSearchParams();

    if (filters.subject) params.append('subject', filters.subject);
    if (filters.minRating) params.append('minRating', filters.minRating);

    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }

    const response = await get(endpoint);
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch teachers:', error);
    return [];
  }
}

export async function getTeacherById(id) {
  try {
    const response = await get(ENDPOINTS.TEACHER_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch teacher:', error);
    return null;
  }
}

export async function createTeacher(data) {
  return post(ENDPOINTS.TEACHERS, data);
}
