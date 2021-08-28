import Models from '../../models';
import {Session} from '../interfaces/Session';
import { Request, Response } from 'express';

const hours = [
  '12:00 AM',
  '1:00 AM',
  '2:00 AM',
  '3:00 AM',
  '4:00 AM',
  '5:00 AM',
  '6:00 AM',
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
  '11:00 PM'
]

export const getUpcomingSessions = async (req:Request, res:Response) => {
  try {
    const { id, role } = req.body.user;

    let upcomingSessions;
    if ( role ==='tutor' ){
      upcomingSessions = await Models.UpcomingSession.findAll({where: {TutorId: id}, include: [{model: Models.Tutor, include: [Models.TutorInfo], attributes: {exclude: ['password']}}, {model: Models.Student, attributes: {exclude: ['password']}}]});
    } else {
      upcomingSessions = await Models.UpcomingSession.findAll({where: {StudentId: id}, include: [{model: Models.Tutor, include: [Models.TutorInfo], attributes: {exclude: ['password']}}, {model: Models.Student, attributes: {exclude: ['password']}}]});
    }
    upcomingSessions.forEach((session: Session) => {
      session['sortDate'] = Number(new Date(`${session.date} ${hours.indexOf(session.time)}:00`));
    })
    upcomingSessions.sort((a: Session, b: Session) => a.sortDate! - b.sortDate!);
    res.status(200).send(upcomingSessions);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

export const addUpcomingSessions = async (req:Request, res:Response) => {
  //date format: 2021-12-22, time format: 3:00 PM
  try {
    const { id  } = req.body.user;
    const { TutorId, date, time, cost, sessionContext  } = req.body;
    await Models.UpcomingSession.create({TutorId, date, time, cost, sessionContext, StudentId: id});
    res.status(201).send('New tutoring session created!');
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

export const getHistorySessions = async (req:Request, res:Response) => {
  try {
    const { id, role } = req.body.user;

    let historySessions;
    if ( role ==='tutor' ){
      historySessions = await Models.HistorySession.findAll({where: {TutorId: id}, include: [{model: Models.Tutor, include: [Models.TutorInfo], attributes: {exclude: ['password']}}, {model: Models.Student, attributes: {exclude: ['password']}}]});
    } else {
      historySessions = await Models.HistorySession.findAll({where: {StudentId: id}, include: [{model: Models.Tutor, include: [Models.TutorInfo], attributes: {exclude: ['password']}}, {model: Models.Student, attributes: {exclude: ['password']}}]});
    }
    res.status(200).send(historySessions);

  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

export const updateHistoryUpcomingSessions = async (req:Request, res:Response) => {
  try {
    const { upcomingSessionId } = req.body;
    const sessionInfoInstance = await Models.UpcomingSession.findOne({attributes: {exclude: ['createdAt', 'updatedAt']}, where:{id: upcomingSessionId}});
    const sessionInfo = sessionInfoInstance.get({plain: true });
    const sessionInfoDeepCopy = { ...sessionInfo};
    delete sessionInfoDeepCopy.id; 
    const newHistorySession = await Models.HistorySession.create({...sessionInfoDeepCopy});
    await sessionInfoInstance.destroy();
    res.status(200).send('Moved UpcomingSession to HistorySession in database');

  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

export const deleteUpcomingSession = async (req:Request, res:Response) => {
  try {
    const { sessionId } = req.params;
    const sessionToDelete = await Models.UpcomingSession.findOne({where: {id: sessionId}})
    if (!sessionToDelete) {
      res.status(404).send('Session doesn\'t exist');
      return;
    } else {
    await sessionToDelete.destroy();
    res.status(204).send('Session deleted')
  }

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}