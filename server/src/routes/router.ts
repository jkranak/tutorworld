import express from 'express';
import { createStudent, createTutor, login, verifyUser } from '../controllers/authController';
import { updateTutorInfo, getStudentInfo, updateStudentInfo, getAllTutorsInfoAvail, getTutorInfoAvail } from '../controllers/infoController';
import { changeStudentPassword, changeTutorPassword } from '../controllers/passwordController';
import { addUpcomingSessions, getHistorySessions, getUpcomingSessions, updateHistoryUpcomingSessions } from '../controllers/sessionsController';
import { getAllTutorsAvail, getTutorAvailByDate, updateTutorAvail } from '../controllers/tutorAvailController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { studentMiddleware, tutorMiddleware } from '../middlewares/roleMiddleware';
import {stripePayment} from '../controllers/paymentController';
import { addFavTutor, getAllFavTutors, removeFavTutor, getAllFavTutorsLess } from '../controllers/favTutorsController';
import { updateRating } from '../controllers/ratingController';
import { connectToRoom, retrieveMessagesByRoom, retrieveSenderId, retrieveUserRooms, sendMessage } from '../controllers/chatController';
const router = express.Router();


//test route
router.get('/', (req, res) => {
  res.send('Hello World!')
})

//auth routes
router.post('/students', createStudent);
router.post('/users/login', login);
router.post('/tutors', createTutor);
router.get('/user/verify', authMiddleware, verifyUser);

//info routes
router.put('/tutors/tutor/info', authMiddleware, tutorMiddleware, updateTutorInfo);
router.get('/tutors/:tutor/allInfo', authMiddleware, getTutorInfoAvail); //gets all tutor info and availabilty
router.get('/students/student/info', authMiddleware, studentMiddleware, getStudentInfo);
router.put('/students/student/info', authMiddleware, studentMiddleware, updateStudentInfo);
router.get('/search', authMiddleware, getAllTutorsInfoAvail); //search array of objects with allTutorsInfo and avalabilty combined for easy filtering
// router.get('/tutors/tutor/allInfo', authMiddleware, tutorMiddleware, getAllTutorInfo);//may be redundent since above takes userId as paramater

//change password routes
router.put('/tutors/tutor/password', authMiddleware, tutorMiddleware, changeTutorPassword);
router.put('/students/student/password', authMiddleware, studentMiddleware, changeStudentPassword);

//tutorAvail
router.put('/tutors/tutor/tutorAvail', authMiddleware, tutorMiddleware, updateTutorAvail);
router.get('/tutors/allTutorsAvail', authMiddleware, getAllTutorsAvail); //can be used by both student and tutor
router.get('/tutors/:tutorId/tutorAvail/:date', authMiddleware, studentMiddleware, getTutorAvailByDate); //used by student to find tutor availibity for given date


//upcoming/history sessions routes
router.get('/upcomingSessions', authMiddleware, getUpcomingSessions);
router.post('/upcomingSessions', authMiddleware, studentMiddleware, addUpcomingSessions);
router.get('/historySessions', authMiddleware, getHistorySessions);
router.put('/endSession', authMiddleware, updateHistoryUpcomingSessions); //deletes from upcoming session and adds it to history session

//when student submits a rating
router.put('/submitRating', authMiddleware, studentMiddleware, updateRating);

//favTutor routes
router.get('/students/student/favTutors', authMiddleware, studentMiddleware, getAllFavTutors); //gets only first name, last name, tutorId, image Url
router.post('/students/student/favTutors', authMiddleware, studentMiddleware, addFavTutor);
router.delete('/students/student/favTutors/:TutorId', authMiddleware, studentMiddleware, removeFavTutor);
router.get('/students/student/favTutorsLess', authMiddleware, studentMiddleware, getAllFavTutorsLess);

//Stripe payment
router.post('/payment', stripePayment);

// Chat

router.post('/message/send', authMiddleware, sendMessage);
router.post('/room', authMiddleware, connectToRoom);
router.get('/room/all', authMiddleware, retrieveUserRooms);
router.get('/room/messages/:RoomId', authMiddleware, retrieveMessagesByRoom);
router.get('/sender/:id/:role', authMiddleware, retrieveSenderId);


export default router;

