import { AvailabilityDays } from '../interfaces/Availability';
import { StudentComplete } from '../interfaces/Student';
import { TutorUpdate } from '../interfaces/Tutor';
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

export const getTutorDetails = async (id: number) => {
  try {
    const response = await api.get(`/tutors/${id}/allInfo`);
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
    const response = await api.put('/tutors/tutor/info', user);
    return response.status;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const updatePassword = async (role: string, oldPassword: string, newPassword: string) => {
  try {
    const response = role === 'tutor'
      ? await api.put('/tutors/tutor/password', {oldPassword, newPassword})
      : await api.put('/students/student/password', {oldPassword, newPassword});
      return response;
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

export const updateAvailability = async (avail: AvailabilityDays) => {
  try {
    const response = await api.put('/tutors/tutor/tutorAvail', avail);
    return response.status;
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

export const getUserSessions = async () => {
  try {
    const response = await api.get('/upcomingSessions');
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getUserHistory = async () => {
  try {
    const response = await api.get('/historySessions');
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const deleteSession = async (id: string) => {
  try {
    const response = await api.delete(`/upcomingSessions/${id}`);
    return response.status;
  } catch (error) {
    console.log(error);
    return error;
  }
}
//'/upcomingSessions/:sessionId'

export const updateHistoryUpcomingSessions = async (upcomingSessionId: string) => {
  try {
    const response = await api.put('/endSession', {upcomingSessionId});
    return response.status;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getFavTutors = async () => {
  try {
    const response = await api.get('/students/student/favTutors');
    return (response.data);
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getFavTutorsLess = async () => {
  try {
    const response = await api.get('/students/student/favTutorsLess');
    return (response.data);
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const addFavTutor = async (id: string) => {
  try {
    const response = await api.post('/students/student/favTutors', {TutorId: id});
    return (response.status); //201 or 409
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const removeFavTutor = async (id: string) => {
  try {
    const response = await api.delete(`/students/student/favTutors/${id}`);
    return (response.status); //200 or 404
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const updateRating = async (starRating: number, review: string, date: string, time: string) => {
  try {
    const response = await api.put('/submitRating', { starRating, review, date, time });
    return (response.status);
  } catch (error) {
    console.log(error);
    return error;
  }
}