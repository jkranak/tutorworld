import api from './apiConfig';

export const addTutorLibrary = async (LibraryId: any) => {
  try {
    const response = await api.post('/tutors/tutor/libraries', {LibraryId});
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getAllLibraries = async () => {
  try {
    const response = await api.get('/libraries');
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getLibraryAllTutors = async (LibraryId: any) => {
  try {
    const response = await api.get(`/libraries/${LibraryId}/allTutors`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getAllLibrariesTutor = async (TutorId: any) => {
  try {
    const response = await api.get(`/tutors/${TutorId}/libraries`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const removeTutorLibrary = async (LibraryId: any) => {
  try {
    const response = await api.delete(`/tutors/tutor/${LibraryId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}