import bcrypt from 'bcrypt';
import { TimeoutError } from 'sequelize/types';
import Models from '../../models';
import { generateToken } from '../generateToken';

export const createStudent = async (req:any, res:any) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  if (!email || !firstName || !lastName || !password ||!confirmPassword) return res.status(400).send({ message: 'Please enter all fields.' });

  try {
    const user = await Models.Student.findOne({where: {email}});
    if (user) {
      return res.status(400).send({ message: 'Email taken, chose another one.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords don't match." });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await Models.Student.create({email, firstName, lastName, password: hashedPassword});
    res.status(201).send({
      user: {
        email,
        role: 'student',
      },
      token: generateToken(email),
    });
  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
};

export const login = async (req:any, res:any) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send({ message: 'Please enter all fields.' });

  let tutor;

  try {
    const student = await Models.Student.findOne({where: {email}});
    if (!student) {
      tutor = await Models.Tutor.findOne({where: {email}});
      if (!tutor) return res.status(404).send({ message: 'Cannot find account.' });
    }

    const user = student || tutor;

    if (await bcrypt.compare(password, user.password)) {
      res.status(200).send(
        {
          user: {
            email,
            role: user===student? 'student':'tutor',
          },
          token: generateToken(email),
        },
      );
    } else {
      res.status(400).send({ message: 'Wrong password' });
    }
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export const createTutor = async (req:any, res:any) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  if (!email || !firstName || !lastName || !password ||!confirmPassword) return res.status(400).send({ message: 'Please provide all fields.' });

  try {
    const user = await Models.Tutor.findOne({where: {email}});
    if (user) {
      return res.status(400).send({ message: 'Email taken, chose another one.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords don't match." });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await Models.Tutor.create({email, firstName, lastName, password: hashedPassword});
    res.status(201).send('Tutor account created!');
  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
};