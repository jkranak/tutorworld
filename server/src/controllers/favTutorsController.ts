import Models from '../../models';

export const addFavTutor = async (req:any, res:any) => {
  try {
    const { id  } = req.body.user;

    const { TutorId  } = req.body;

    await Models.FavTutor.create({TutorId, StudentId: id});

    res.status(201).send('Added as a favourite tutor')

  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }

}

export const removeFavTutor = async (req:any, res:any) => {
  try {

    const { TutorId  } = req.params;

    const tutorToDelete = await Models.FavTutor.findOne({where:{TutorId}});

    if (!tutorToDelete) {
      res.status(404).send('Tutor is not a favourite tutor');
      return;
    }
    await tutorToDelete.destroy();

    res.status(200).send('Removed as a favourite tutor')

  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }

}

export const getAllFavTutors = async (req:any, res:any) => {
  try {
    const { id  } = req.body.user;

    const allFavTutorsInstance = await Models.FavTutor.findAll({where: {StudentId: id}});

    const allFavTutorsId = allFavTutorsInstance.map((FavTutorInstance:any) => FavTutorInstance.get({plain: true }).TutorId); //array of ids of favourite tutors to use for filtering
    //send back tutorId , first name last name
    const allTutorsInfoInstance = await Models.Tutor.findAll({attributes: {exclude: ['password']}, include: Models.TutorInfo});

    // spread operator and remove the TutorInfo property, removes all duplicates
    const cleanAllTutorsInfo = allTutorsInfoInstance.map((allTutorInfoInstance:any) => {
      const allTutorInfo = allTutorInfoInstance.get({plain: true });
     return {TutorId: allTutorInfo.TutorInfo.TutorId, firstName:allTutorInfo.firstName, lastName:allTutorInfo.lastName, imageUrl: allTutorInfo.TutorInfo.imageUrl};
    });

    let allFavTutorInfo = [];

    for (let i=0; i<allFavTutorsId.length; i++){
      for (let j=0; j<cleanAllTutorsInfo.length; j++){
        if (allFavTutorsId[i]===cleanAllTutorsInfo[j].TutorId){
          allFavTutorInfo.push(cleanAllTutorsInfo[j])
          break;
        }
      }
    }

    res.status(201).send(allFavTutorInfo);

  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }

}