import Models from '../../models';
import { Request, Response } from 'express';

export const addFavTutor = async (req:Request, res:Response) => {
  try {
    const { id  } = req.body.user;

    const { TutorId  } = req.body;

    const favTutorAlready = await Models.FavTutor.findOne({where: {StudentId: id, TutorId}});

    if (favTutorAlready) {
      res.status(409).send('Already a favourite tutor')
    } else {
      await Models.FavTutor.create({TutorId, StudentId: id});

      res.status(201).send('Added as a favourite tutor')
    }


  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }

}

export const removeFavTutor = async (req:Request, res:Response) => {
  try {
    const { id  } = req.body.user;

    const { TutorId  } = req.params;

    const tutorToDelete = await Models.FavTutor.findOne({where:{TutorId, StudentId: id}});

    if (!tutorToDelete) {
      res.status(404).send('Tutor is not a favourite tutor');
      return;
    }
    await tutorToDelete.destroy();

    res.status(200).send('Removed as a favourite tutor')

  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }

}

export const getAllFavTutors = async (req:Request, res:Response) => {
  try {
    const { id  } = req.body.user;

    const allFavTutorsInstance = await Models.FavTutor.findAll({where: {StudentId: id}});

    const allFavTutorsId = allFavTutorsInstance.map((FavTutorInstance:any) => FavTutorInstance.get({plain: true }).TutorId); //array of ids of favourite tutors to use for filtering
    //send back tutorId , first name last name
    const allTutorsInfoAvailInstance = await Models.Tutor.findAll({attributes: {exclude: ['password']}, include: [Models.TutorInfo, Models.TutorAvailability]});

    // spread operator and remove the TutorInfo property, removes all duplicates
    const cleanAllTutorsInfoAvail = allTutorsInfoAvailInstance.map((allTutorInfoAvailInstance:any) => {
      const allTutorInfoAvail = allTutorInfoAvailInstance.get({plain: true });
      const cleanAllTutorInfoAvail = {...allTutorInfoAvail, ...allTutorInfoAvail.TutorInfo, availability: {...allTutorInfoAvail.TutorAvailability}};
      delete cleanAllTutorInfoAvail.TutorInfo;
      delete cleanAllTutorInfoAvail.TutorAvailability;
      return cleanAllTutorInfoAvail;
    });

    let allFavTutorInfo = [];

    for (let i=0; i<allFavTutorsId.length; i++){
      for (let j=0; j<cleanAllTutorsInfoAvail.length; j++){
        if (allFavTutorsId[i]===cleanAllTutorsInfoAvail[j].TutorId){
          allFavTutorInfo.push(cleanAllTutorsInfoAvail[j])
          break;
        }
      }
    }

    res.status(201).send(allFavTutorInfo);

  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }

}

export const getAllFavTutorsLess = async (req:Request, res:Response) => {
  try {
    const { id  } = req.body.user;
    const allFavTutorsInstance = await Models.FavTutor.findAll({where: {StudentId: id}});
    res.status(201).send(allFavTutorsInstance);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}