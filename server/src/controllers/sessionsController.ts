import Models from '../../models';

export const getUpcomingSessions = async (req:any, res:any) => {
  try {
    const { id, role } = req.body.user;

    let upcomingSessions;
    if ( role ==='tutor' ){
      upcomingSessions = await Models.UpcomingSession.findAll({where: {TutorId: id}});
    } else {
      upcomingSessions = await Models.UpcomingSession.findAll({where: {StudentId: id}});
    }

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
      historySessions = await Models.HistorySession.findAll({where: {TutorId: id}});
    } else {
      historySessions = await Models.HistorySession.findAll({where: {StudentId: id}});
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
  //historySessions just has rewview and starRating properties or else it would be the same as upcoming sessions
  //delete from upcoming sessions usinfg maybe the upcomign session id instead of full object
  //add to history sessions
  //Only update review and star rating if given: need to update the starrating inside of tutor info wiht the new reviews star rating
  try {
    const { id } = req.body.user;
    //need upcomingSessionId to delete and copy over the contents to hsitory session
    const { upcomingSessionId, review, starRating } = req.body;
    //grab and store session object from upcomingSession table
    const sessionInfoInstance = await Models.UpcomingSession.findOne({attributes: {exclude: ['createdAt', 'updatedAt']}, where:{id: upcomingSessionId}});
    const sessionInfo = sessionInfoInstance.get({plain: true }); //get tutorId from sessionInfo
    const TutorId = sessionInfo.TutorId
    //add upcomingSession, review, starRating to historySessions table
    const sessionInfoDeepCopy = { ...sessionInfo};
    delete sessionInfoDeepCopy.id; //remove id from sessionInfo
    const newHistorySession = await Models.HistorySession.create({...sessionInfoDeepCopy, review, starRating});
    //delete the object from upcomingSession table
    await sessionInfoInstance.destroy();
    // if a starRating is given, then update the starRating in tutorsInfo table, if no rating is given no need to update
    if (starRating) {
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

      res.status(200).send('Moved UpcomingSession to HistorySession in database along with review and starRating, avg star rating is updated beacuse one was given')

    } else {
      res.status(200).send('Moved UpcomingSession to HistorySession in database along with review and starRating, avg star rating not updated beacuse none given');
    }

  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
    }



}