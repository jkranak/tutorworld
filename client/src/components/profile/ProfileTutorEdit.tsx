import { FormEvent, useState, FC } from 'react';
import { languages, subjects } from '../../assets/subjects_languages';
import {TutorWithAvailability} from '../../interfaces/Tutor';
import { updateTutor } from '../../services/apiUser';
import {ProfileChangeAvailability} from './ProfileChangeAvailability';
// import { FiX } from 'react-icons/fi';

interface Props {
  tutorDetails: TutorWithAvailability
  setTutorDetails: (tutor: TutorWithAvailability) => void
  setEditing: (bool: boolean) => void
}

interface EditedUser {
  firstName: string
  lastName: string
  email: string
  description: string 
  experience: string 
  imageUrl: string 
  education: string 
  price: number
}

export const ProfileTutorEdit: FC<Props> = ({tutorDetails, setTutorDetails, setEditing}: Props) => {
  const [editedUser, setEditedUser] = useState({
    firstName: tutorDetails.firstName,
    lastName: tutorDetails.lastName,
    email: tutorDetails.email,
    description: tutorDetails.description, 
    experience: tutorDetails.experience, 
    imageUrl: tutorDetails.imageUrl, 
    education: tutorDetails.education, 
    price: tutorDetails.price,
  });
    const [tutorLanguages, setTutorLanguages] = useState([...tutorDetails.languages]);
    const [tutorSubjectLevels, setTutorSubjectLevels] = useState([...tutorDetails.subjectLevels]);
    const [changeAvail, setChangeAvail] = useState(false);

  const handleTutorChange = (event: {target: {name: string, value: string}}) => {
    setEditedUser((current: EditedUser) => ({...current, [event.target.name]: event.target.value}))
  }

  const addLanguage = (event: {target: {name: string, value: string}}) => {
    if (tutorLanguages && !tutorLanguages.includes(event.target.value)) {
      setTutorLanguages([...tutorLanguages, event.target.value]);
    }
  }

  const removeLanguage = (language: string) => {
    if (tutorLanguages.length === 1) setTutorLanguages(['']);
    else {
      const newLanguageList = tutorLanguages.filter((lang)=> lang !== language);
      setTutorLanguages(newLanguageList);
    }
  }

  const addSubject = (event: {target: {name: string, value: string}}) => {
    if (tutorSubjectLevels && !tutorSubjectLevels.includes(event.target.value)) {
      setTutorSubjectLevels([...tutorSubjectLevels, event.target.value]);
    }
  }

  const removeSubject = (subject: string) => {
    if (tutorSubjectLevels.length === 1) setTutorSubjectLevels(['']);
    else {
      const newSubjectList = tutorSubjectLevels.filter((subj)=> subj !== subject );
      setTutorSubjectLevels(newSubjectList)
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const profileWithoutAvail = {
      ...editedUser,
      subjectLevels: [...tutorSubjectLevels], 
      languages: [...tutorLanguages]
    }
    const res = await updateTutor(profileWithoutAvail);
    if (res === 201){
      setEditing(false);
      setTutorDetails({...tutorDetails, ...profileWithoutAvail});}
  }

  return (
    <div className="form edit-form">
      <form onSubmit={handleSubmit}>
        <div className="form--title">
          <h1>Edit Profile</h1>
        </div>

        <label>First Name</label>
        <input type="text" id="fname" name="firstName" onChange={handleTutorChange} defaultValue={tutorDetails.firstName} placeholder="First Name" required className="text-input text-input--blue"/>

        <label>Last Name</label>
        <input type="text" className="text-input text-input--blue" id="lname" name="lastName" onChange={handleTutorChange}  defaultValue={tutorDetails.lastName} placeholder="Last Name"required/>

        <label>Email</label>
        <input type="email" id="email" name="email" onChange={handleTutorChange} defaultValue={tutorDetails.email} placeholder="Email" required className="text-input text-input--blue"/>

        <label>Description</label>
        <input type="text" className="text-input text-input--blue" id="description" name="description" onChange={handleTutorChange} defaultValue={tutorDetails.description} placeholder="Description" required/>

        <label>Hourly Rate [$/hour]</label>
        <input type="number" min="0" id="price" name="price" onChange={handleTutorChange} defaultValue={tutorDetails.price} placeholder="Hourly Rate $/hr" required className="text-input text-input--blue"/>

        <label>Education</label>
        <textarea className="text-input text-input--blue text-input--textarea" id="education" name="education" onChange={handleTutorChange} defaultValue={tutorDetails.education} placeholder="Education" required/>

        <select name="subjects" onChange={addSubject} defaultValue="" className="select-input select-input--blue">
          <option value="" disabled>Add subjects</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>
            <div className="form--multi-select">
              {tutorSubjectLevels.map((subject: string) => 
                <div key={subject}><button className="form--select-tag" onClick={() => removeSubject(subject)}>{subject}</button>   
                </div>)}
            </div>
        <select name="languages" onChange={addLanguage} defaultValue="" className="select-input select-input--blue" >
          <option value="" disabled>Add Languages</option>
          {languages.map((language, index) => (
            <option key={index} value={language}>{language}</option>
          ))}
        </select>
        <div className="form--multi-select">
        {tutorLanguages.map((language: string) => 
          <div key={language}><button onClick={() => removeLanguage(language)} className="form--select-tag" >{language}</button >
          </div>)}

        </div>
          <label>Experience</label>
          <textarea className="text-input text-input--blue text-input--textarea" id="experience" name="experience" onChange={handleTutorChange} defaultValue={tutorDetails.experience} placeholder="Experience" required/>
          <button type="submit" className="btn btn--blue form--btn">Submit</button>
      </form>
      {changeAvail 
        ? <><ProfileChangeAvailability tutorDetails={tutorDetails} setTutorDetails={setTutorDetails} setChangeAvail={setChangeAvail}/> <button onClick={() => setChangeAvail(false)} className="btn btn--clear">Cancel Change Availability</button></>
        : <button onClick={() => setChangeAvail(true)} className="btn btn--clear">Change Availability</button>}
    </div>
  )
}
