import express from 'express';
import { createStudent, createTutor, login } from '../controllers/authController';
import {stripePayment} from '../controllers/paymentController';

const router = express.Router();


//test route
router.get('/', (req, res) => {
  res.send('Hello World!')
})

//auth routes
router.post('/students', createStudent);
router.post('/users/login', login);
router.post('/tutors', createTutor);
router.post('/payment', stripePayment);

export default router;

