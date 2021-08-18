

export const studentMiddleware = async (req:any, res:any, next:any) => {
  try {
    const {role} = req.body.user;

    if(role==='student') next();
    else res.status(403).send('You are not a student');

  } catch (error) {
    console.log(error);
  }
}

export const tutorMiddleware = async (req:any, res:any, next:any) => {
  try {
    const {role} = req.body.user;

    if(role==='tutor') next();
    else res.status(403).send('You are not a tutor');

  } catch (error) {
    console.log(error);
  }
}