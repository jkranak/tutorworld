import { FormEvent, useState, FC } from 'react';
import { UserDetails } from '../interfaces/User';
import { languages, subjects } from '../assets/subjects_languages';
// import { FiX } from 'react-icons/fi';


interface Props {
  setEditing: (editing: boolean) => void
  tutor: UserDetails;
}

export const EditTutorProfile: FC<Props> = ({setEditing, tutor }: Props) => {
  const [editedUser, setEditedUser] = useState(tutor);
  
  const handleTutorChange = (event: {target: {name: string, value: any}}) => {
    setEditedUser((current: any) => ({...current, [event.target.name]: event.target.value}))
    console.log(editedUser);
  }

  const addLanguage = (event: {target: {name: string, value: string}}) => {
    if (tutor.languages && !tutor.languages.includes(event.target.value)) {
    setEditedUser((current: any) => ({...current,  languages: [...current.languages, event.target.value]}))
    }
  }

  const addSubject = (event: {target: {name: string, value: string}}) => {
    if (tutor.subjectLevels && !tutor.subjectLevels.includes(event.target.value)) {
    setEditedUser((current: any) => ({...current,  subjectLevels: [...current.subjectLevels, event.target.value]}))
    }
  }

  const removeSubject = (index: number) => {
    if (tutor?.subjectLevels?.length === 1) {
      setEditedUser((current: UserDetails) => ({...current,  subjectLevels: ['']}))
    }
    const newSubjectList = tutor?.subjectLevels?.filter((_, ind)=> ind !== index )
    setEditedUser((current: UserDetails) => ({...current,  subjectLevels: newSubjectList}))
  }

  const removeLanguage = (index: number) => {
    if (tutor?.languages?.length === 1) {
      setEditedUser((current: UserDetails) => ({...current,  languages: ['']}))
    }
    const newLanguageList = tutor?.languages?.filter((_, ind)=> ind !== index );
    setEditedUser((current: UserDetails) => ({...current, languages: newLanguageList}))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setEditing(false);
  }

  console.log(editedUser)
  return (
    <div className="form edit-form">
      <form onSubmit={handleSubmit}>
        <div className="form--title">
          <h1>Edit Profile</h1>
        </div>

        <label>First Name</label>
        <input type="text" id="fname" name="firstName" onChange={handleTutorChange} defaultValue={tutor.firstName} placeholder="First Name" required className="text-input text-input--blue"/>

        <label>Last Name</label>
        <input type="text" className="text-input text-input--blue" id="lname" name="lastName" onChange={handleTutorChange}  defaultValue={tutor.lastName} placeholder="Last Name"required/>

        <label>Email</label>
        <input type="email" id="email" name="email" onChange={handleTutorChange} defaultValue={tutor.email} placeholder="Email" required className="text-input text-input--blue"/>

        <label>Description</label>
        <input type="text" className="text-input text-input--blue" id="description" name="description" onChange={handleTutorChange} defaultValue={tutor.description} placeholder="Description" required/>

        <label>Hourly Rate [$/hour]</label>
        <input type="number" min="0" id="price" name="price" onChange={handleTutorChange} defaultValue={tutor.price} placeholder="Hourly Rate $/hr" required className="text-input text-input--blue"/>

        <label>Education</label>
        <textarea className="text-input text-input--blue text-input--textarea" id="education" name="education" onChange={handleTutorChange} defaultValue={tutor.education} placeholder="Education" required/>

        <select name="subjects" onChange={addSubject} defaultValue="" className="select-input select-input--blue">
          <option value="" disabled>Add subjects</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>
            <div className="form--multi-select">
              {editedUser?.subjectLevels?.map((subject, index): any => 
                <div key={subject}><button className="form--select-tag" onClick={() => removeSubject(index)}>{subject}</button>
                   
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
          <label>Change Experience</label>
          <textarea className="text-input text-input--blue text-input--textarea" id="experience" name="experience" onChange={handleTutorChange} value={tutor?.experience} placeholder="Experience" required/>
          <button type="submit" className="btn btn--blue form--btn">Submit</button>
      </form>
    </div>
  )
}
