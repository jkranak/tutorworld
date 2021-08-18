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


}

export const getAllFavTutors = async (req:any, res:any) => {
  try {
    const { id  } = req.body.user;

    const allFavTutorsInstance = await Models.FavTutor.findAll({attributes: {include: ['TutorId']}});

    const allFavTutorsId = allFavTutorsInstance.map((FavTutorInstance:any) => FavTutorInstance.get({plain: true }));
    //send back tutorId , first name last name
    console.log(allFavTutorsId)

    res.status(201).send(allFavTutorsId)

  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }

}