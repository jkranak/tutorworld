import api from './apiConfig';

export const getRooms = async () => {
  try {
    const response = await api.get('/room/all');
    return response.data;
  } catch (error) {
    return error;
  }
}