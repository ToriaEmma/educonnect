import { get, post, ENDPOINTS } from './api';

export async function getAllSchools() {
  try {
    const response = await get(ENDPOINTS.SCHOOLS);
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch schools:', error);
    return [];
  }
}

export async function getSchoolById(id) {
  try {
    const response = await get(ENDPOINTS.SCHOOL_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch school:', error);
    return null;
  }
}

export async function createSchool(data) {
  return post(ENDPOINTS.SCHOOLS, data);
}
