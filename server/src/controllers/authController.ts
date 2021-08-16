import bcrypt from 'bcrypt';
import Models from '../../models';
import { generateToken } from '../generateToken';

export const createStudent = async (req:any, res:any) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  if (!email || !firstName || !lastName || !password ||!confirmPassword) return res.status(400).send({ message: 'Please enter all fields.' });

  try {
    const user = await Models.Student.findOne({where: {email}});
    console.log(user)
    if (user) {
      return res.status(400).send({ message: 'Username taken, chose another one.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords don't match." });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(email, firstName, lastName, hashedPassword)
    const newUser = await Models.Student.create({email, firstName, lastName, password: hashedPassword});
    res.status(201).send({
      user: {
        email:newUser.email,
        role: 'student',
      },
      token: generateToken(email),
    });
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};
