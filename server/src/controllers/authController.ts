import bcrypt from 'bcrypt';
import Models from '../../models';
import { generateToken } from '../generateToken';

export const createStudent = async (req:any, res:any) => {
  const { email, firstName, lastName, password, confirmPassword, imageUrl } = req.body;

  if (!email || !firstName || !lastName || !password ||!confirmPassword) return res.status(400).send({ message: 'Please enter all fields.' });

  try {
    const user = await Models.Student.findOne({where: {email}});
    const tutor = await Models.Tutor.findOne({where: {email}});
    if (user || tutor ) {
      return res.status(400).send({ message: 'Email taken, chose another one.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords don't match." });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await Models.Student.create({email, firstName, lastName, password: hashedPassword, imageUrl});
    const newSender = await Models.Sender.create({UserId: newUser.id, role: 'student', firstName: newUser.firstName, lastName: newUser.lastName, imageUrl: newUser.imageUrl})
    res.status(201).send({
      user: {
        id: newUser.id,
        SenderId: newSender.id,
        role: 'student',
      },
      token: generateToken(newUser.id, 'student'),
    });
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};

export const login = async (req:any, res:any) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send({ message: 'Please enter all fields.' });

  let tutor;
  let SenderId;
  try {
    const student = await Models.Student.findOne({where: {email}});
    if (!student) {
      tutor = await Models.Tutor.findOne({where: {email}});
      if (tutor )SenderId = await Models.Sender.findOne({where: {UserId: tutor.id, role: 'tutor'}})
      if (!tutor) return res.status(403).send({ message: 'Cannot find account.' });
    }
    const user = student || tutor;
    if (student) SenderId = await Models.Sender.findOne({where: {UserId: student.id, role: 'student'}})
    
    if (await bcrypt.compare(password, user.password)) {
      res.status(200).send(
        {
          user: {
            id: user.id,
            role: user===student? 'student':'tutor',
            SenderId: SenderId.id
          },
          token: generateToken(user.id, user===student? 'student':'tutor'),
        },
      );
    } else {
      res.status(403).send({ message: 'Wrong password' });
    }
  } catch (error) {
    console.log( `Could not login: ${error}`)
    res.status(500).send(error);
  }
};

export const createTutor = async (req:any, res:any) => {
  const { email, firstName, lastName, password, confirmPassword, imageUrl } = req.body;

  if (!email || !firstName || !lastName || !password ||!confirmPassword || !imageUrl) return res.status(400).send({ message: 'Please provide all fields.' });

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
    const newUser = await Models.Tutor.create({email, firstName, lastName, password: hashedPassword, imageUrl});
    await Models.Sender.create({UserId: newUser.id, role: 'tutor', firstName: newUser.firstName, lastName: newUser.lastName, imageUrl: newUser.imageUrl})
    res.status(201).send('Tutor account created!');
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};

export const verifyUser = async (req: any, res: any) => {
  const { id, role } = req.body.user;

  try {
    if (role === 'student') {
      const student = await Models.Student.findOne({where: {id}});
      if (student) {
        const sender = await Models.Sender.findOne({where: {UserId: id, role}})
        res.status(200)
        res.send({user: {id, role, SenderId: sender.id} })
      } else {
        console.log(`Could not find student`);
      }
    } else if (role === 'tutor') {
      const tutor = await Models.Tutor.findOne({where: {id}});
      if (tutor) {
        const sender = await Models.Sender.findOne({where: {UserId: id, role}})
        res.status(200);
        res.send({user: {id, role, SenderId: sender.id} });
      } else {
        console.log(`Could not find tutor`);
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
