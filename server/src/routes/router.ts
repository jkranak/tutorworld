import express from 'express';
import { createStudent, createTutor, login, verifyUser } from '../controllers/authController';
import { updateTutorInfo, getStudentInfo, updateStudentInfo, getAllTutorsInfoAvail, getTutorInfoAvail } from '../controllers/infoController';
import { changeStudentPassword, changeTutorPassword } from '../controllers/passwordController';
import { addUpcomingSessions, getHistorySessions, getUpcomingSessions, updateHistoryUpcomingSessions, deleteUpcomingSession } from '../controllers/sessionsController';
import { getAllTutorsAvail, getTutorAvailByDate, updateTutorAvail } from '../controllers/tutorAvailController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { studentMiddleware, tutorMiddleware } from '../middlewares/roleMiddleware';
import {stripePayment} from '../controllers/paymentController';
import { addFavTutor, getAllFavTutors, removeFavTutor, getAllFavTutorsLess } from '../controllers/favTutorsController';
import { updateRating } from '../controllers/ratingController';
import { connectToRoom, retrieveMessagesByRoom, retrieveSenderId, retrieveUserRooms, sendMessage } from '../controllers/chatController';
import { addLibrary, addTutorLibrary, getAllLibraries, getAllLibrariesTutor, getLibraryAllTutors, removeTutorLibrary } from '../controllers/mapController';
const router = express.Router();

router.post('/students', createStudent);
router.post('/users/login', login);
router.post('/tutors', createTutor);
router.get('/user/verify', authMiddleware, verifyUser);

router.put('/tutors/tutor/info', authMiddleware, tutorMiddleware, updateTutorInfo);
router.get('/tutors/:tutor/allInfo', authMiddleware, getTutorInfoAvail);
router.get('/students/student/info', authMiddleware, studentMiddleware, getStudentInfo);
router.put('/students/student/info', authMiddleware, studentMiddleware, updateStudentInfo);
router.get('/search', authMiddleware, getAllTutorsInfoAvail);

router.put('/tutors/tutor/password', authMiddleware, tutorMiddleware, changeTutorPassword);
router.put('/students/student/password', authMiddleware, studentMiddleware, changeStudentPassword);

router.put('/tutors/tutor/tutorAvail', authMiddleware, tutorMiddleware, updateTutorAvail);
router.get('/tutors/allTutorsAvail', authMiddleware, getAllTutorsAvail);
router.get('/tutors/:tutorId/tutorAvail/:date', authMiddleware, studentMiddleware, getTutorAvailByDate);

router.get('/upcomingSessions', authMiddleware, getUpcomingSessions);
router.post('/upcomingSessions', authMiddleware, studentMiddleware, addUpcomingSessions);
router.get('/historySessions', authMiddleware, getHistorySessions);
router.put('/endSession', authMiddleware, updateHistoryUpcomingSessions);
router.delete('/upcomingSessions/:sessionId', authMiddleware, deleteUpcomingSession);

router.put('/submitRating', authMiddleware, studentMiddleware, updateRating);

router.get('/students/student/favTutors', authMiddleware, studentMiddleware, getAllFavTutors);
router.post('/students/student/favTutors', authMiddleware, studentMiddleware, addFavTutor);
router.delete('/students/student/favTutors/:TutorId', authMiddleware, studentMiddleware, removeFavTutor);
router.get('/students/student/favTutorsLess', authMiddleware, studentMiddleware, getAllFavTutorsLess);

router.post('/payment', stripePayment);

router.post('/message/send', authMiddleware, sendMessage);
router.post('/room', authMiddleware, connectToRoom);
router.get('/room/all', authMiddleware, retrieveUserRooms);
router.get('/room/messages/:RoomId', authMiddleware, retrieveMessagesByRoom);
router.get('/sender/:id/:role', authMiddleware, retrieveSenderId);

router.post('/tutors/tutor/libraries', authMiddleware, tutorMiddleware, addTutorLibrary);
router.post('/libraries', addLibrary);
router.get('/libraries', authMiddleware, getAllLibraries);
router.get('/libraries/:LibraryId/allTutors', authMiddleware, getLibraryAllTutors);
router.get('/tutors/:TutorId/libraries', authMiddleware, getAllLibrariesTutor)
router.delete('/tutors/tutor/:LibraryId', authMiddleware, tutorMiddleware, removeTutorLibrary);

export default router;

