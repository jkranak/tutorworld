import bcrypt from 'bcrypt';
import Models from '../../models';
import { generateToken } from '../generateToken';

export const createStudent = async (req:any, res:any) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  if (!email || !firstName || !lastName || !password ||!confirmPassword) return res.status(400).send({ message: 'Please enter all fields.' });

  try {
    const user = await Models.Student.findOne({where: {email}});
    const tutor = await Models.Tutor.findOne({where: {email}});
    console.log(user);
    if (user || tutor ) {
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
        id: newUser.id,
        role: 'student',
      },
      token: generateToken(newUser.id, 'student'),
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
    console.log(student);
    if (!student) {
      tutor = await Models.Tutor.findOne({where: {email}});
      if (!tutor) return res.status(404).send({ message: 'Cannot find account.' });
    }

    const user = student || tutor;

    if (await bcrypt.compare(password, user.password)) {
      res.status(200).send(
        {
          user: {
            id: user.id,
            role: user===student? 'student':'tutor',
          },
          token: generateToken(user.id, user===student? 'student':'tutor'),
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
    const student = await Models.Student.findOne({where: {email}});
    if (user || student) {
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

export const verifyUser = async (req: any, res: any) => {
  const { id, role } = req.body.user;

  try {
    if (role === 'student') {
      const student = await Models.Student.findOne({where: {id}});
      if (student) {
        res.status(200).send({user: {id, role} })
      } else {
        console.log(`Could not find student`);
      }
    } else if (role === 'tutor') {
      const tutor = await Models.Tutor.findOne({where: {id}});
      if (tutor) {
        res.status(200).send({user: {id, role} })
      } else {
        console.log(`Could not find tutor`);
      }
    }
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};
