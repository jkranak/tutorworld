import express from 'express';
import { createStudent, createTutor, login } from '../controllers/authController';
// import { updateTutorInfo, getAllTutorInfo } from '../controllers/infoController';
import { authMiddleware } from '../middlewares/authMiddleware';
const router = express.Router();


//test route
router.get('/', (req, res) => {
  res.send('Hello World!')
})

//auth routes
router.post('/students', createStudent);
router.post('/users/login', login);
router.post('/tutors', createTutor);

//info routes
// router.put('/tutors/tutor/info', authMiddleware, updateTutorInfo);
// router.get('/tutors/tutor/allInfo', authMiddleware, getAllTutorInfo);


export default router;

