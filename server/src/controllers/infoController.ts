import Models from '../../models';

export const updateTutorInfo = async (req:any, res:any) => {
  try {
    const { TutorId, description, experience, imageUrl, resumeUrl, rating, education, price, subjectLevels, languages  } = req.body;

    const updatedtutorInfo = { TutorId, description, experience, imageUrl, resumeUrl, rating, education, price, subjectLevels, languages  };

    const tutorInfo = await Models.TutorInfo.findOne({where:{TutorId}});

    if(tutorInfo){
      //updating maybe a single column
      await Models.TutorInfo.update(updatedtutorInfo, {where: {TutorId}});
      res.status(201).send('Updated Tutor Info');
    } else {
      //updated for first time so need to create the row
      const newTutorInfo = await Models.TutorInfo.create(updatedtutorInfo);
      res.status(201).send('Updated Tutor Info for the first time');
    }

  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}

export const getAllTutorInfo = async (req:any, res:any) => {

  try {
    const { id } = req.body.user;

    const tutorInfo = await Models.Tutor.findOne({attributes: {exclude: ['password']}, where: {id}, include: Models.TutorInfo});

    res.send(tutorInfo);
    res.status(200);

  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}

export const getStudentInfo = async (req:any, res:any) => {
  try {
    const { id } = req.body.user;

    const studentInfo = await Models.Student.findOne({attributes: {exclude: ['password']}, where:{id}});

    res.send(studentInfo);
    res.status(200);
  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}

export const updateStudentInfo = async (req:any, res:any) => {
  try {
    const { imageUrl } = req.body;
    const { id } = req.body.user;

    const updatedStudentInfo = { imageUrl };

    await Models.Student.update(updatedStudentInfo, {where: {id}});
    res.status(201).send('Updated Student Info');


  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}