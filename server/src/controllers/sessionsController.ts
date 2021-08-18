import Models from '../../models';

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


export const updateHistorySessions = async (req:any, res:any) => {
  //historySessions just has rewview and starRating properties or else it would be the same as upcoming sessions
  //delete from upcoming sessions usinfg the upcomign session id instead of full object
  //add to history sessions
  //Only update review and star rating if given: need to update the starrating inside of tutor info wiht the new reviews star rating

}