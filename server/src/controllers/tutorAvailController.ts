import Models from '../../models';
import { Request, Response } from 'express';

export const getTutorAvail = async (req:Request, res:Response) => {
  try {
    const { tutorId } = req.params;

    const tutorAvail = await Models.TutorAvailability.findOne({where:{id: tutorId}});
    if (!tutorAvail) res.status(404).send('Tutor availability does not exist!')
    else res.status(200).send(tutorAvail);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}


export const updateTutorAvail = async (req:Request, res:Response) => {
  try {
    const { id  } = req.body.user;

    const availability = req.body;

    const tutorAvail = await Models.TutorAvailability.findOne({where:{TutorId: id}});

    if(tutorAvail){
      await Models.TutorAvailability.update(availability, {where: {TutorId: id}});
      res.status(201).send('Updated Tutor Availability');
    } else {
      await Models.TutorAvailability.create({...availability, TutorId: id});
      res.status(201).send('Updated Tutor Availability for the first time');
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

export const getAllTutorsAvail = async (req:Request, res:Response) => {
  try {
    const allTutorsAvail = await Models.TutorAvailability.findAll();
    res.status(200).send(allTutorsAvail);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

const dayOfWeekArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const getTutorAvailByDate = async (req:Request, res:Response) => {

  try {
    // format for date: 2021-12-22
    const { date, tutorId } = req.params;
    const dayOfWeek = dayOfWeekArray[new Date(`${date} 00:00`).getDay()];
    const tutorAvailForDayInstance = await Models.TutorAvailability.findOne({where: {TutorId: tutorId}});
    if (!tutorAvailForDayInstance) res.status(404).send('Tutor availability does not exist!'); 
    let tutorAvailForDay = tutorAvailForDayInstance.get({plain: true })[dayOfWeek];
    const timeSlotsTakenInstance = await Models.UpcomingSession.findAll({attributes: ['time'], where:{TutorId: tutorId, date}});
    const timeSlotsTaken = timeSlotsTakenInstance.map((timeSlotTakenInstance:any) => timeSlotTakenInstance.get({plain: true }));

    for (let i=0; i<timeSlotsTaken.length; i++){
      delete tutorAvailForDay[timeSlotsTaken[i].time];
    }
    const availTimes = Object.keys(tutorAvailForDay);
    res.status(200).send(availTimes);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}