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

export const removeTutorLibrary = async (req:any, res:any) => {
  try {
    const { id  } = req.body.user;

    const { LibraryId  } = req.params;

    const locationToDelete = await Models.TutorLibrary.findOne({where:{LibraryId, TutorId: id}});

    if (!locationToDelete) {
      res.status(404).send('The location is already not an option for this tutor');
      return;
    }
    await locationToDelete.destroy();

    res.status(200).send('Removed location from tutor option')

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

    const LibraryAllTutorsInstance = await Models.Library.findAll({where: {id: LibraryId}, include: [Models.TutorLibrary]});

    if (!LibraryAllTutorsInstance.length) return res.status(400).send('LibraryId does not exist');

    const LibraryAllTutors = LibraryAllTutorsInstance.map((LibraryTutorInstance:any) => {
      const LibraryTutor =  LibraryTutorInstance.get({plain: true });
      return LibraryTutor;
    });

    const LibraryAllTutorsInfoInstances = LibraryAllTutors[0].TutorLibraries.map(async (LibraryTutor:any)=>{
      const TutorId = LibraryTutor.TutorId;
      return await Models.Tutor.findOne({attributes: {exclude: ['password']}, where: {id: TutorId}, include: [Models.TutorInfo, Models.TutorAvailability]});
    });

    Promise.all(LibraryAllTutorsInfoInstances).then((values)=>{
      const LibraryAllTutorsInfo = values.map((LibraryTutorInfoInstances:any)=>{
        const LibraryTutorInfo =  LibraryTutorInfoInstances.get({plain: true });
        const cleanLibraryTutorInfo = {...LibraryTutorInfo, ...LibraryTutorInfo.TutorInfo, availability: {...LibraryTutorInfo.TutorAvailability}}
        delete cleanLibraryTutorInfo.TutorInfo;
        delete cleanLibraryTutorInfo.TutorAvailability;
        return cleanLibraryTutorInfo;
      })

      res.status(200).send(LibraryAllTutorsInfo);
    })


  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

export const getAllLibrariesTutor = async (req:any, res:any) => {
  try {

    const { TutorId } = req.params;

    const allLibraryTutorInstance = await Models.TutorLibrary.findAll({where: {TutorId}});

    const allLibraryTutor = allLibraryTutorInstance.map((LibraryTutorInstance:any) => {
      const LibraryTutor =  LibraryTutorInstance.get({plain: true });
      return LibraryTutor;
    });

    const allLibraryInfoTutorInstances = allLibraryTutor.map(async (LibraryTutor:any)=>{
      const LibraryId = LibraryTutor.LibraryId;
      return await Models.Library.findOne({where: {id: LibraryId}});
    });

    Promise.all(allLibraryInfoTutorInstances).then((values)=>{
      const allLibraryInfoTutor = values.map((LibraryInfoTutorInstances:any)=>{
        const LibraryInfo =  LibraryInfoTutorInstances.get({plain: true });
        return LibraryInfo;
      })

      res.status(200).send(allLibraryInfoTutor);
    })


  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}