import express from 'express';
import { createStudent, createTutor, login, verifyUser } from '../controllers/authController';
import { updateTutorInfo, getAllTutorInfo, getStudentInfo, updateStudentInfo } from '../controllers/infoController';
import { changeStudentPassword, changeTutorPassword } from '../controllers/passwordController';
import { addUpcomingSessions, getUpcomingSessions, updateHistorySessions } from '../controllers/sessionsController';
import { getAllTutorsAvail, getTutorAvail, getTutorAvailByDate, updateTutorAvail } from '../controllers/tutorAvailController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { studentMiddleware, tutorMiddleware } from '../middlewares/roleMiddleware';
import {stripePayment} from '../controllers/paymentController';
import { addFavTutor, getAllFavTutor, removeFavTutor } from '../controllers/favTutorsController';
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
router.get('/tutors/tutor/allInfo', authMiddleware, tutorMiddleware, getAllTutorInfo);
router.get('/students/student/info', authMiddleware, studentMiddleware, getStudentInfo);
router.put('/students/student/info', authMiddleware, studentMiddleware, updateStudentInfo);
// router.get('/tutors/allInfo', authMiddleware, getEveryTutorsInfo); //can be used by both student and tutor

//change password routes
router.put('/tutors/tutor/password', authMiddleware, tutorMiddleware, changeTutorPassword);
router.put('/students/student/password', authMiddleware, studentMiddleware, changeStudentPassword);

//tutorAvail
// router.get('/tutors/:tutorId/tutorAvail', authMiddleware, getTutorAvail); //can be used by both student and tutor
router.put('/tutors/tutor/tutorAvail', authMiddleware, tutorMiddleware, updateTutorAvail);
<<<<<<< HEAD
router.get('/tutors/allTutorsAvail', authMiddleware, getAllTutorsAvail); //can be used by both student and tutor
router.get('/tutors/:tutorId/tutorAvail/:date', authMiddleware, studentMiddleware, getTutorAvailByDate); //used by student to find tutor availibity for given date
=======
// router.get('/tutors/allTutorsAvail', authMiddleware, getAllTutorsAvail); //can be used by both student and tutor
>>>>>>> 75cb907b9b74b45132890fe09277069825f46df3

//upcoming/history sessions routes
router.get('/upcomingSessions', authMiddleware, getUpcomingSessions);
router.post('/upcomingSessions', authMiddleware, studentMiddleware, addUpcomingSessions);
router.put('/historySessions', authMiddleware, updateHistorySessions); //not done

//favTutor routes
router.get('/students/student/favTutor', getAllFavTutor); //not done
router.post('/students/student/favTutor', addFavTutor); //not done
router.delete('/students/student/favTutor', removeFavTutor); //not done

//Stripe payment
router.post('/payment', stripePayment);

export default router;

