import Models from '../../models';
import bcrypt from 'bcrypt';

export const changeTutorPassword = async (req: any, res: any) => {
  try {
    const { id } = req.body.user;
    const { newPassword } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await Models.Tutor.update({ password: hashedPassword }, {
      where: {id}
    });
    res.send('Password Updated!')
    res.status(204);
  } catch (error) {
    res.status(500);
    res.send(`Could not change password: ${error}`)
  }
}

export const changeStudentPassword = async (req: any, res: any) => {
  try {
    const { id } = req.body.user;
    const { newPassword } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await Models.Student.update({ password: hashedPassword }, {
      where: {id}
    });
    res.send('Password Updated!')
    res.status(204);
  } catch (error) {
    res.status(500);
    res.send(`Could not change password: ${error}`)
  }
}

