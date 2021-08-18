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
    <div className="form edit-form">
      <form onSubmit={handleSubmit}>
        <div className="form--title">
          <h1>Edit Profile</h1>
        </div>

        <label>First Name</label>
        <input type="text" id="fname" name="firstName" onChange={handleTutorChange} value={tutor?.firstName} placeholder="First Name" required className="text-input text-input--blue"/>

        <label>Last Name</label>
        <input type="text" className="text-input text-input--blue" id="lname" name="lastName" onChange={handleTutorChange}  value={tutor?.lastName} placeholder="Last Name"required/>

        <label>Email</label>
        <input type="email" id="email" name="email" onChange={handleTutorChange} value={tutor?.email} placeholder="Email" required className="text-input text-input--blue"/>

        <label>Description</label>
        <input type="text" className="text-input text-input--blue" id="description" name="description" onChange={handleTutorChange} value={tutor?.description} placeholder="Description" required/>

        <label>Hourly Rate [$/hour]</label>
        <input type="number" min="0" id="price" name="price" onChange={handleTutorChange} value={tutor?.price} placeholder="Hourly Rate $/hr" required className="text-input text-input--blue"/>

        <label>Education</label>
        <textarea className="text-input text-input--blue text-input--textarea" id="education" name="education" onChange={handleTutorChange} value={tutor?.education} placeholder="Education" required/>

        <select name="subjects" onChange={handleSelect} defaultValue="" className="select-input select-input--blue">
          <option value="" disabled>Add subjects</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>
            <div className="form--multi-select">
              {tutor?.subjectLevels.map((subject, index): any => 
                <div key={subject}><span className="form--select-tag">{subject}</span>
                  {tutor?.subjectLevels[0].length > 0 && <FiX onClick={() => removeSubject(index)}/>}
                </div>)}
            </div>
        <select name="languages" onChange={handleSelect} defaultValue="" className="select-input select-input--blue" >
          <option value="" disabled>Add Languages</option>
          {languages.map((language, index) => (
            <option key={index} value={language}>{language}</option>
          ))}
        </select>
        <div className="form--multi-select">
        {tutor?.languages.map((language, index): any => 
          <div key={language}><span className="form--select-tag" >{language}</span>
            {tutor?.languages[0].length > 0 && <FiX onClick={() => removeLanguage(index)}/>}
          </div>)}

        </div>
          <label>Change Experience</label>
          <textarea className="text-input text-input--blue text-input--textarea" id="experience" name="experience" onChange={handleTutorChange} value={tutor?.experience} placeholder="Experience" required/>
          <button type="submit" className="btn btn--blue form--btn">Submit</button>
      </form>
    </div>
  )
}
