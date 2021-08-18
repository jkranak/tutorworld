import Models from '../../models';

export const updateUpcomingSessions = async (req:any, res:any) => {
  //add session that just got booked by a student with a specific tutor
  //studentId, tutorId, datetime, cost, sessionContext

  //what is the front end going to be giving me
}

export const updateHistorySessions = async (req:any, res:any) => {
  //historySessions just has rewview and starRating properties or else it would be the same as upcoming sessions
  //delete from upcoming sessions
  //add to history sessions
  //Only update review and star rating if given: need to update the starrating inside of tutor info wiht the new reviews star rating

}