import {StudentComplete} from '../interfaces/Student';
import {TutorUpdate} from '../interfaces/Tutor';
import { User, UserLogin } from '../interfaces/User';
import api from './apiConfig';

export const createUser = async (user: User) => {
  try {
    const response = await api.post('/students', user);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const login = async (user: UserLogin) => {
  try {
    const response = await api.post('/users/login', user);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const verifyUser = async () => {
  try {
    const response = await api.get('/user/verify');
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getStudentDetails = async () => {
  try {
    const response = await api.get('/students/student/info');
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getTutorDetails = async () => {
  try {
    const response = await api.get('/tutors/tutor/allInfo');
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const updateStudent = async (user: StudentComplete) => {
  try {
    const response = await api.put('/students/student/info', user);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const updateTutor = async (user: TutorUpdate) => {
  try {
    const response = await api.put('tutors/tutor/info', user);
    return response.status;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getAllTutors = async () => {
  try {
    const response = await api.get('/search');
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getAllTutorsAvailability = async () => {
  try {
    const response = await api.get('/tutors/allTutorsAvail');
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getOneTutorAvailability = async (tutorId: string, date: string) => {
  try {
    const response = await api.get(`/tutors/${tutorId}/tutorAvail/${date}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const addOneSession = async (TutorId: number, date: string, time: string, cost: number, sessionContext: string) => {
  try {
    const response = await api.post('/upcomingSessions', {TutorId, date, time, cost, sessionContext});
    return response.status;
  } catch (error) {
    console.log(error);
    return error;
  }
}