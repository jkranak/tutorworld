import { User } from '../interfaces/User';
import api from './apiConfig';

export const createUser = async (user: User) => {
  try {
    const response = await api.post('/students', user);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}