import api from './apiConfig';

export const getRooms = async () => {
  try {
    const response = await api.get('/room/all');
    return response.data;
  } catch (error) {
    return error;
  }
}

export const getMessages = async (RoomId: string) => {
  try {
    const response = await api.get(`/room/messages/${RoomId}`);
    return response.data;
  } catch (error) {
    return error;
  }
}