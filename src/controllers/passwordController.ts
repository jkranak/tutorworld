import Models from '../../models';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export const changeTutorPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.body.user;
    const { oldPassword, newPassword } = req.body;
    const tutor = await Models.Tutor.findOne({where: {id}});
    if (await bcrypt.compare(oldPassword, tutor.password)) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await Models.Tutor.update({ password: hashedPassword }, {
        where: {id}
      });
      res.status(204).send('Password Updated!');
    } else {
      res.status(404).send('Wrong Password!');
    }
  } catch (error) {
    res.status(500).send(`Could not change password: ${error}`);
  }
}

export const changeStudentPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.body.user;
    const { oldPassword, newPassword } = req.body;
    const student = await Models.Student.findOne({where: {id}});
    if (await bcrypt.compare(oldPassword, student.password)) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await Models.Student.update({ password: hashedPassword }, {
        where: {id}
      });
      res.status(204).send('Password Updated!');
    } else {
      res.status(404).send('Wrong Password!');
    }
  } catch (error) {
    res.status(500).send(`Could not change password: ${error}`);
  }
}