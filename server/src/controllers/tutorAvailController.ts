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
      //updating maybe a single column
      await Models.TutorAvailability.update(availability, {where: {TutorId: id}});
      res.status(201).send('Updated Tutor Availability');
    } else {
      //updated for first time so need to create the row
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
    // format for date: 2021-12-22 or 2021-09-09 given to me
    const { date, tutorId } = req.params;
    const dayOfWeek = dayOfWeekArray[new Date(`${date} 00:00`).getDay()];
    // find the availability of the tutor for that day
    const tutorAvailForDayInstance = await Models.TutorAvailability.findOne({where: {TutorId: tutorId}});
    if (!tutorAvailForDayInstance) res.status(404).send('Tutor availability does not exist!'); //extra portection in case of invalid tutorId sent
    let tutorAvailForDay = tutorAvailForDayInstance.get({plain: true })[dayOfWeek]; //just the data so we can use it to cross reference
    //find upcoming sessions for the tutor
    const timeSlotsTakenInstance = await Models.UpcomingSession.findAll({attributes: ['time'], where:{TutorId: tutorId, date}});
    const timeSlotsTaken = timeSlotsTakenInstance.map((timeSlotTakenInstance:any) => timeSlotTakenInstance.get({plain: true })); //just the data so we can use it to cross reference

    //cross reference the timeSlotsTaken for that date with the tuorAvailability for that date to get what slots are available then send that array back
    for (let i=0; i<timeSlotsTaken.length; i++){
      delete tutorAvailForDay[timeSlotsTaken[i].time]; //delete all the times from the day availability that is already taken
    }
    const availTimes = Object.keys(tutorAvailForDay); //send back an array of all the available times for that day
    res.status(200).send(availTimes);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}