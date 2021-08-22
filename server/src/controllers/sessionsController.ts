import Models from '../../models';
import {Session} from '../interfaces/Session';


const timeConvert = (date: string, time: string) => {
  let dateRes;
  let timeArr = time.match(/([0-9]+):([0-9]+) ([A-Z]+)/);
  if (timeArr![1] === '12' && timeArr![3] === 'AM') dateRes = new Date(`${date} 00:${timeArr![2]}`)
  else if (timeArr![1] === '12') dateRes = new Date(`${date} 12:${timeArr![2]}`)
  else if (timeArr![3] === 'PM') {
    dateRes = new Date(`${date} ${(Number(timeArr![1]) + 12).toString()}:${timeArr![2]}`);
  }
  else dateRes = new Date(`${date} ${timeArr![1]}:${timeArr![2]}`);
  return Number(dateRes);
}

export const getUpcomingSessions = async (req:any, res:any) => {
  try {
    const { id, role } = req.body.user;

    let upcomingSessions;
    if ( role ==='tutor' ){
      upcomingSessions = await Models.UpcomingSession.findAll({where: {TutorId: id}, include: [{model: Models.Tutor, include: [Models.TutorInfo], attributes: {exclude: ['password']}}, {model: Models.Student, attributes: {exclude: ['password']}}]});
    } else {
      upcomingSessions = await Models.UpcomingSession.findAll({where: {StudentId: id}, include: [{model: Models.Tutor, include: [Models.TutorInfo], attributes: {exclude: ['password']}}, {model: Models.Student, attributes: {exclude: ['password']}}]});
    }
    upcomingSessions.forEach((session: Session) => {
      session['sortDate'] = timeConvert(session.date, session.time);
    })
    upcomingSessions.sort((a: Session, b: Session) => a.sortDate! - b.sortDate!);
    res.send(upcomingSessions);
    res.status(200);

  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}

export const addUpcomingSessions = async (req:any, res:any) => {
  //format for date: 2021-12-22 or 2021-09-09 given to me
  //formt for time given: 3:00 PM
  try {
    const { id  } = req.body.user;

    const { TutorId, date, time, cost, sessionContext  } = req.body;
    //TutorId, date, time, cost, sessionContext
    await Models.UpcomingSession.create({TutorId, date, time, cost, sessionContext, StudentId: id});
    res.status(201).send('New tutoring session created!');
  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}

export const getHistorySessions = async (req:any, res:any) => {
  try {
    const { id, role } = req.body.user;

    let historySessions;
    if ( role ==='tutor' ){
      historySessions = await Models.HistorySession.findAll({where: {TutorId: id}, include: [{model: Models.Tutor, include: [Models.TutorInfo], attributes: {exclude: ['password']}}, {model: Models.Student, attributes: {exclude: ['password']}}]});
    } else {
      historySessions = await Models.HistorySession.findAll({where: {StudentId: id}, include: [{model: Models.Tutor, include: [Models.TutorInfo], attributes: {exclude: ['password']}}, {model: Models.Student, attributes: {exclude: ['password']}}]});
    }

    res.send(historySessions);
    res.status(200);

  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}


export const updateHistoryUpcomingSessions = async (req:any, res:any) => {
  try {
    //need upcomingSessionId to delete and copy over the contents to hsitory session
    const { upcomingSessionId } = req.body;
    //grab and store session object from upcomingSession table
    const sessionInfoInstance = await Models.UpcomingSession.findOne({attributes: {exclude: ['createdAt', 'updatedAt']}, where:{id: upcomingSessionId}});
    const sessionInfo = sessionInfoInstance.get({plain: true }); //get tutorId from sessionInfo
    //add upcomingSession to historySessions table
    const sessionInfoDeepCopy = { ...sessionInfo};
    delete sessionInfoDeepCopy.id; //remove id from sessionInfo
    const newHistorySession = await Models.HistorySession.create({...sessionInfoDeepCopy});
    //delete the object from upcomingSession table
    await sessionInfoInstance.destroy();
    res.status(200).send('Moved UpcomingSession to HistorySession in database');

  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
    }

}