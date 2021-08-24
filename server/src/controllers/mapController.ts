import Models from '../../models';

export const addTutorLibrary = async (req:any, res:any) => {
  try {
    const { id  } = req.body.user;

    const {LibraryId} = req.body;

    const libraryInfo = await Models.TutorLibrary.findOne({where:{LibraryId, TutorId: id}});

    if (libraryInfo) { //check if library is or not already a library for tutor
      res.status(409).send('Already a library option for this tutor');
    } else {
      const newTutorLibrary = await Models.TutorLibrary.create({LibraryId, TutorId: id});
      res.status(201).send('Added the library as an option for this tutor');
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

export const addLibrary = async (req:any, res:any) => {
  try {
    const {name, lat, lng, address} = req.body;

    if (!(name&&lat&&lng&&address)) return res.status(400).send('Please provide all fields.' );

    const newLibrary= await Models.Library.create({name, lat, lng, address});

    res.status(201).send('Added the library for app');

  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

export const getAllLibraries = async (req:any, res:any) => {
  try {

    const allLibraries= await Models.Library.findAll();

    res.status(200).send(allLibraries);

  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

export const getLibraryAllTutors = async (req:any, res:any) => {
  try {

    const { LibraryId } = req.params;

    const allLibraryAllTutors = await Models.Library.findAll({where: {id: LibraryId}, include: [Models.TutorLibrary]});

    if (!allLibraryAllTutors.length) return res.status(400).send('LibraryId does not exist');

    res.status(200).send(allLibraryAllTutors);


  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

export const getAllLibrariesTutor = async (req:any, res:any) => {
  try {





  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}