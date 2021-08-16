import { FormEvent, useState } from 'react';
import {emptyTutor} from '../interfaces/Tutor';
import { emptyTutorInfo } from '../interfaces/TutorInfo';
import { languages, subjects } from '../assets/subjects_languages';
import { FiX } from 'react-icons/fi';

interface Props {
  setEditing: (editing: boolean) => void
}

export function EditTutorProfile ({setEditing}: Props) {
  const [tutor, setTutor] = useState(emptyTutor);
  const [tutorInfo, setTutorInfo] = useState(emptyTutorInfo);
  const [tutorSubjects, setTutorSubjects] = useState(['']);
  const [tutorLanguages, setTutorLanguages] = useState(['']);

  const handleTutorChange = (event: {target: {name: string, value: any}}) => {
    setTutor(current => ({...current, [event.target.name]: event.target.value}))
  }

  const handleTutorInfoChange = (event: {target: {name: string, value: any}}) => {
    setTutorInfo(current => ({...current, [event.target.name]: event.target.value}))
  }

  function handleSelect (event: {target: {name: string, value: string}}) {
    if (event.target.name === 'languages' && !tutorLanguages.includes(event.target.value)) {
      if (tutorLanguages[0] === '') setTutorLanguages([event.target.value])
      else setTutorLanguages([...tutorLanguages, event.target.value])
    }
    else if (event.target.name === 'subjects' && !tutorSubjects.includes(event.target.value)) {
      if (tutorSubjects[0] === '') setTutorSubjects([event.target.value]);
      else setTutorSubjects([...tutorSubjects, event.target.value])
    }
  }

  const removeSubject = (index: number) => {
    const newSubjectList = tutorSubjects.filter((_, ind)=> ind !== index )
    setTutorSubjects(newSubjectList);
  }

  const removeLanguage = (index: number) => {
    const newLanguageList = tutorLanguages.filter((_, ind)=> ind !== index );
    setTutorLanguages(newLanguageList);
  }

  function editClick () {
    setEditing(false);
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setEditing(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Change First Name</label>
        <input type="text" id="fname" name="firstName" onChange={handleTutorChange} value={tutor.firstName} placeholder="First Name" />
        <label>Change Last Name</label>
        <input type="text" id="lname" name="lastName" onChange={handleTutorChange}  value={tutor.lastName} placeholder="Last Name"/>
        <label>Change Email</label>
        <input type="email" id="email" name="email" onChange={handleTutorChange} value={tutor.email} placeholder="Email" />
        <label>Change Brief Description</label>
        <input type="text" id="description" name="description" onChange={handleTutorInfoChange} value={tutorInfo.description} placeholder="Description"/>
        <label>Change Hourly Rate [$]</label>
        <input type="number" min="0" id="price" name="price" onChange={handleTutorInfoChange} value={tutorInfo.price} placeholder="Hourly Rate $/hr"/>
        <label>Change Education</label>
        <input type="text" id="education" name="education" onChange={handleTutorInfoChange} value={tutorInfo.education} placeholder="Education"/>
        <select name="subjects" onChange={handleSelect} defaultValue="Add subjects" >
          <option value="Add subjects" disabled hidden>Add subjects</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>
        {tutorSubjects.map((subject, index): any => 
          <div key={subject}><span>{subject}</span>
            {tutorSubjects[0].length > 0 && <FiX onClick={() => removeSubject(index)}/>}
          </div>)}
        <select name="languages" onChange={handleSelect} defaultValue="Add languages" >
          <option value="Add languages" disabled hidden>Add Languages</option>
          {languages.map((language, index) => (
            <option key={index} value={language}>{language}</option>
          ))}
        </select>
        {tutorLanguages.map((language, index): any => 
          <div key={language}><span>{language}</span>
            {tutorLanguages[0].length > 0 && <FiX onClick={() => removeLanguage(index)}/>}
          </div>)}
          <label>Change Experience</label>
          <input type="text" id="experience" name="experience" onChange={handleTutorInfoChange} value={tutorInfo.experience} placeholder="Experience"/>
          <button type="submit">Submit</button>
      </form>
      <button onClick={editClick}>Exit Edit Profile</button>
    </div>
  )
}
