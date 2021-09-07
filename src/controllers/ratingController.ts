import Models from '../../models';
import { Request, Response } from 'express';

export const updateRating = async (req:Request, res:Response) => {
  try {
    const { id } = req.body.user;
    const { review, starRating, date, time } = req.body
    const historySessionInstance = await Models.HistorySession.findOne({where:{StudentId: id, date, time}});
    const historySession = historySessionInstance.get({plain: true });
    const TutorId = historySession.TutorId;
    const historySessionId = historySession.id;
    await Models.HistorySession.update({review, starRating}, {where: {id:historySessionId}});
    const tutorRatingsInstance = await Models.HistorySession.findAll({attributes: {include: ['TutorId', 'starRating']}, where:{TutorId}});

    const tutorRatings = tutorRatingsInstance.map((tutorRatingInstance:any) => tutorRatingInstance.get({plain: true }));
    const numOfSessions = tutorRatings.length;
    let sumOfAllStarRatings = 0;
    tutorRatings.forEach((tutorRating:any) => {
      sumOfAllStarRatings += tutorRating.starRating;
    });
    const avgStarRating = Number((sumOfAllStarRatings/numOfSessions).toFixed(2));
    await Models.TutorInfo.update({rating: avgStarRating}, {where: {TutorId}});
    res.status(200).send('Review and starRating updated, and updated overall star rating of tutor');
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}