import { MessageI } from '../interfaces/Message';
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

export const sendNewMessage = async (message: MessageI) => {
  try {
    const response = await api.post(`/message/send`, message);
    return response.data;
  } catch (error) {
    return error;
  }
}
// TO-DO fix any typescripts
export const enterRoom = async (users: any) => {
  try {
    const response = await api.post(`/room`, users);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const getSenderId = async (id: string, role: string) => {
  try {
    const response = await api.get(`/sender/${id}/${role}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

// if a room with both of them already exists