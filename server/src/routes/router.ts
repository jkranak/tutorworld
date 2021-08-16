import express from 'express';
import { createStudent } from '../controllers/authController';

const router = express.Router();


//test route
router.get('/', (req, res) => {
  res.send('Hello World!')
})

//auth routes
router.post('/users', createStudent)


export default router;

