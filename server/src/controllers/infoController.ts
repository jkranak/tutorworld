import Models from '../../models';

export const updateTutorInfo = async (req:any, res:any) => {
  try {
    const { id  } = req.body.user;

    const {description, experience, imageUrl, education, price, subjectLevels, languages  } = req.body;

    const updatedtutorInfo = { description, experience, imageUrl, education, price, subjectLevels, languages  };

    const tutorInfo = await Models.TutorInfo.findOne({where:{TutorId: id}});

    if(tutorInfo){
      //updating maybe a single column
      await Models.TutorInfo.update(updatedtutorInfo, {where: {TutorId:id}});
      res.status(201).send('Updated Tutor Info');
    } else {
      //updated for first time so need to create the row
      const newTutorInfo = await Models.TutorInfo.create({...updatedtutorInfo, TutorId: id});
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

    const tutorInfoInstance = await Models.Tutor.findOne({attributes: {exclude: ['password']}, where: {id}, include: Models.TutorInfo});

    // spread operator and remove the TutorInfo property, removes all duplicates
    const tutorInfo = tutorInfoInstance.get({plain: true });
    const cleanTutorInfo = {...tutorInfo, ...tutorInfo.TutorInfo};
    delete cleanTutorInfo.TutorInfo;

    res.send(cleanTutorInfo);
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