import Models from '../../models';
import moment from 'moment';

export const getTutorAvail = async (req:any, res:any) => {
  try {
    const { tutorId } = req.params;

    const tutorAvail = await Models.TutorAvailability.findOne({where:{id: tutorId}});
    if (!tutorAvail) res.status(404).send('Tutor availability does not exist!')
    else res.status(200).send(tutorAvail);
  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}


export const updateTutorAvail = async (req:any, res:any) => {
  try {
    const { id  } = req.body.user;
    //front end provides an availability object like:
    // req.body =  {
    //   monday: {
    //   "3:00 PM": true,
    //   "4:00 PM": true
    //    },
    //   tuesday: {
    //    "6:00 PM": true,
    //    "7:00 PM": true
    //   },
    //   wednesday: {
    //    "9:00 AM": true,
    //    "1:00 PM": true
    //   }
    //    **OTHER 4 DAYS TOO
    // }
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
    res.status(500);
    res.send(error);
  }
}

export const getAllTutorsAvail = async (req:any, res:any) => {
  try {
    const allTutorsAvail = await Models.TutorAvailability.findAll();

    res.send(allTutorsAvail);
    res.status(200);


  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}

const dayOfWeekArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const getTutorAvailByDate = async (req:any, res:any) => {

  try {
    // format for date: 2021-12-22 or 2021-09-09 given to me
    const { date, tutorId } = req.params;

    const dateMoment = moment(date);

    const day = dateMoment.day(); // 0 - sunday , 1 - monday

    const dayOfWeek = dayOfWeekArray[day];

    // find the availability of the tutor for that day
    const tutorAvailForDayInstance = await Models.TutorAvailability.findOne({attributes: [`${dayOfWeek}`], where:{id: tutorId}});
    if (!tutorAvailForDayInstance) res.status(404).send('Tutor availability does not exist!'); //extra portection in case of invalid tutorId sent
    let tutorAvailForDay = tutorAvailForDayInstance.get({plain: true })[dayOfWeek]; //just the data so we can use it to cross reference

    //find upcoming sessions for the tutor
    const timeSlotsTakenInstance = await Models.UpcomingSession.findAll({attributes: ['time'], where:{id: tutorId, date}});
    const timeSlotsTaken = timeSlotsTakenInstance.map((timeSlotTakenInstance:any) => timeSlotTakenInstance.get({plain: true })); //just the data so we can use it to cross reference
    console.log(tutorAvailForDay)
    console.log(timeSlotsTaken)
    //cross reference the timeSlotsTaken for that date with the tuorAvailability for that date to get what slots are available then send that array back
    for (let i=0; i<timeSlotsTaken.length; i++){
      delete tutorAvailForDay[timeSlotsTaken[i].time]; //delete all the times from the day availability that is already taken
    }

    const availTimes = Object.keys(tutorAvailForDay); //send back an array of all the available times for that day
    res.status(200).send(availTimes);

  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }

}