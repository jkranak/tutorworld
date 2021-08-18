import { FormEvent, useState, FC } from 'react';
import { TutorComplete } from '../interfaces/Tutor';
import { languages, subjects } from '../assets/subjects_languages';
import { FiX } from 'react-icons/fi';


interface Props {
  setEditing: (editing: boolean) => void
  tutor: TutorComplete | null;
}

export const EditTutorProfile: FC<Props> = ({setEditing, tutor }: Props) => {
  const [editedUser, setEditedUser] = useState(tutor);

  const handleTutorChange = (event: {target: {name: string, value: any}}) => {
    setEditedUser((current: any) => ({...current, [event.target.name]: event.target.value}))
  }

  const handleSelect = (event: {target: {name: string, value: string}}) => {
    if (event.target.name === 'languages' && !tutor?.languages.includes(event.target.value)) {
      setEditedUser((current: any) => ({...current,  languages: [...current.languages, event.target.value]}))
    }
    else if (event.target.name === 'subjects' && !tutor?.subjectLevels.includes(event.target.value)) {
      setEditedUser((current: any) => ({...current,subjects: [...current.subjects, event.target.value]}))
    }
  }

  const removeSubject = (index: number) => {
    const newSubjectList = tutor?.subjectLevels.filter((_, ind)=> ind !== index )

    setEditedUser((current: any) => ({...current,  subjects: newSubjectList}))
  }

  const removeLanguage = (index: number) => {
    const newLanguageList = tutor?.languages.filter((_, ind)=> ind !== index );

    setEditedUser((current: any) => ({...current, languages: newLanguageList}))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setEditing(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Change First Name</label>
        <input type="text" id="fname" name="firstName" onChange={handleTutorChange} value={tutor?.firstName} placeholder="First Name" required/>
        <label>Change Last Name</label>
        <input type="text" id="lname" name="lastName" onChange={handleTutorChange}  value={tutor?.lastName} placeholder="Last Name"required/>
        <label>Change Email</label>
        <input type="email" id="email" name="email" onChange={handleTutorChange} value={tutor?.email} placeholder="Email" required/>
        <label>Change Brief Description</label>
        <input type="text" id="description" name="description" onChange={handleTutorChange} value={tutor?.description} placeholder="Description" required/>
        <label>Change Hourly Rate [$/hour]</label>
        <input type="number" min="0" id="price" name="price" onChange={handleTutorChange} value={tutor?.price} placeholder="Hourly Rate $/hr" required/>
        <label>Change Education</label>
        <input type="text" id="education" name="education" onChange={handleTutorChange} value={tutor?.education} placeholder="Education" required/>
        <select name="subjects" onChange={handleSelect} defaultValue="Add subjects" >
          <option value="Add subjects" disabled hidden>Add subjects</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>
        {tutor?.subjectLevels.map((subject, index): any => 
          <div key={subject}><span>{subject}</span>
            {tutor?.subjectLevels[0].length > 0 && <FiX onClick={() => removeSubject(index)}/>}
          </div>)}
        <select name="languages" onChange={handleSelect} defaultValue="Add languages" >
          <option value="Add languages" disabled hidden>Add Languages</option>
          {languages.map((language, index) => (
            <option key={index} value={language}>{language}</option>
          ))}
        </select>
        {tutor?.languages.map((language, index): any => 
          <div key={language}><span>{language}</span>
            {tutor?.languages[0].length > 0 && <FiX onClick={() => removeLanguage(index)}/>}
          </div>)}
          <label>Change Experience</label>
          <input type="text" id="experience" name="experience" onChange={handleTutorChange} value={tutor?.experience} placeholder="Experience" required/>
          <button type="submit">Submit</button>
      </form>
    </div>
  )
}
