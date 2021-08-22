import Models from '../../models';

export const updateRating = async (req:any, res:any) => {
//Only update review and star rating if given: need to update the starrating inside of tutor info wiht the new reviews star rating
  try {
    const { id } = req.body.user;
    const { review, starRating, date, time } = req.body
    //update review and starRating to historySession
    const historySessionInstance = await Models.HistorySession.findOne({where:{StudentId: id, date, time}}); //finds latest history session entry for that student since they just finsihed session
    const historySession = historySessionInstance.get({plain: true });
    const TutorId = historySession.TutorId;
    const historySessionId = historySession.id;
    await Models.HistorySession.update({review, starRating}, {where: {id:historySessionId}});

    //update the overal rating of a tutor
    const tutorRatingsInstance = await Models.HistorySession.findAll({attributes: {include: ['TutorId', 'starRating']}, where:{TutorId}});

    const tutorRatings = tutorRatingsInstance.map((tutorRatingInstance:any) => tutorRatingInstance.get({plain: true })); //now able to access data
    //need average satrRating to update tutorInfo starRating
    const numOfSessions = tutorRatings.length;
    let sumOfAllStarRatings = 0;
    tutorRatings.forEach((tutorRating:any) => {
      sumOfAllStarRatings += tutorRating.starRating;
    });
    const avgStarRating = Number((sumOfAllStarRatings/numOfSessions).toFixed(2));
    //update tutorInfo rating
    await Models.TutorInfo.update({rating: avgStarRating}, {where: {TutorId}});

    res.status(200).send('Review and starRating updated, and updated overall star rating of tutor');

  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }

}