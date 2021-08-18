import Models from '../../models';

export const getTutorAvail = async (req:any, res:any) => {
  try {
    const { tutorId } = req.params;

    const tutorAvail = await Models.TutorAvailability.findOne({where:{id: tutorId}});

    if (!tutorAvail) res.status(404).send('Tutor does not exist!')
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

    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

    const newTutorAvail = { monday, tuesday, wednesday, thursday, friday, saturday, sunday };

    const tutorAvail = await Models.TutorAvailability.findOne({where:{id}});

    if(tutorAvail){
      //updating maybe a single column
      await Models.TutorAvailability.update(newTutorAvail, {where: {TutorId: id}});
      res.status(201).send('Updated Tutor Availability');
    } else {
      //updated for first time so need to create the row
      const newTutorInfo = await Models.TutorAvailability.create({...newTutorAvail, TutorId: id});
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
    const AllTutorsAvail = await Models.TutorAvailability.findAll();

    res.send(AllTutorsAvail);
    res.status(200);


  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}