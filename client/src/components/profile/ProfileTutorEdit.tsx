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

export const ProfileTutorEdit: FC<Props> = ({tutorDetails, setTutorDetails, setEditing}: Props) => {
  const [editedUser, setEditedUser] = useState(tutorDetails);
  const [changeAvail, setChangeAvail] = useState(false);

  const handleTutorChange = (event: {target: {name: string, value: any}}) => {
    setEditedUser((current: any) => ({...current, [event.target.name]: event.target.value}))
  }

  const addLanguage = (event: {target: {name: string, value: string}}) => {
    if (editedUser.languages && !editedUser.languages.includes(event.target.value)) {
    setEditedUser((current: TutorWithAvailability) => ({...current,  languages: [...current.languages, event.target.value]}))
    }
  }

  const addSubject = (event: {target: {name: string, value: string}}) => {
    if (editedUser.subjectLevels && !editedUser.subjectLevels.includes(event.target.value)) {
    setEditedUser((current: TutorWithAvailability) => ({...current,  subjectLevels: [...current.subjectLevels, event.target.value]}))
    }
  }

  const removeSubject = (subject: string) => {
    if (editedUser.subjectLevels.length === 1) {
      setEditedUser((current: TutorWithAvailability) => ({...current,  subjectLevels: ['']}))
    }
    const newSubjectList = editedUser?.subjectLevels?.filter((subj)=> subj !== subject );
    setEditedUser((current: TutorWithAvailability) => ({...current,  subjectLevels: newSubjectList}))
  }

  const removeLanguage = (index: number) => {
    if (editedUser?.languages?.length === 1) {
      setEditedUser((current: TutorWithAvailability) => ({...current,  languages: ['']}))
    }
    const newLanguageList = editedUser?.languages?.filter((_, ind)=> ind !== index );
    setEditedUser((current: TutorWithAvailability) => ({...current, languages: newLanguageList}))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const profileWithoutAvail = {
      firstName: editedUser.firstName,
      lastName: editedUser.lastName,
      email: editedUser.email,
      description: editedUser.description, 
      experience: editedUser.experience, 
      imageUrl: editedUser.imageUrl, 
      education: editedUser.education, 
      price: editedUser.price, 
      subjectLevels: editedUser.subjectLevels, 
      languages: editedUser.languages
    }
    const res = await updateTutor(profileWithoutAvail);
    if (res === 201){
      setEditing(false);
      setTutorDetails(editedUser);}
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
              {editedUser?.subjectLevels?.map((subject, index): any => 
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
        {editedUser?.languages?.map((language, index): any => 
          <div key={language}><button onClick={() => removeLanguage(index)} className="form--select-tag" >{language}</button >
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
