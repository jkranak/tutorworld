import { useState } from 'react';
import {Link} from 'react-router-dom';
import { emptyApplication } from '../interfaces/Application';
import languageDict from '../assets/languageDictionary.json';
import subjectsDict from '../assets/subjectDictionary.json';
import { FiBookOpen, FiX } from 'react-icons/fi';

export const Application = () => {
  const [newApplicant, setNewApplicant] = useState(emptyApplication)
  const [submitted, setSubmitted] = useState(false);
  
  function handleSelect (event: {target: {name: string, value: any}}) {
    if (event.target.name === 'languages' && !newApplicant.languages.includes(event.target.value)) {
      setNewApplicant(current => ({...current, languages: [...current.languages, event.target.value]}))
    }
    else if (event.target.name === 'subjects' && !newApplicant.subjects.includes(event.target.value)) {
      setNewApplicant(current => ({...current, subjects: [...current.subjects, event.target.value]}))
    }
    console.log(newApplicant);
  }

  const handleChange = (event: {target: {name: string, value: any}}) => {
    setNewApplicant(current => ({...current, [event.target.name]: event.target.value}))
    console.log(newApplicant);
  }

  const removeSubject = (index: number) => {
    setNewApplicant(current => ({...current, subjects: current.subjects.filter((_, ind)=> ind !== index )}))
  }

  const removeLanguage = (index: number) => {
    setNewApplicant(current => ({...current, languages: current.languages.filter((_, ind)=> ind !== index )}))
  }
  
  
  function handleSubmit () {
    setSubmitted(true);
  }
 
  return (
    <div className="application">
      <div className="form application-form">
        <div className="form--title">
          <h1 className="before-icon">Application</h1>
          <FiBookOpen className="lib-icon form--icon"/>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" id="fname" name="firstName" required onChange={handleChange} value={newApplicant.firstName} placeholder="First Name*" className="text-input text-input--blue"/>
          <input type="text" id="lname" name="lastName" required onChange={handleChange} value={newApplicant.lastName} placeholder="Last Name*" className="text-input text-input--blue"/>
          <input type="text" id="email" name="email" required onChange={handleChange} value={newApplicant.email} placeholder="E-mail*" className="text-input text-input--blue"/>
          <select name="languages" onChange={handleSelect} className="select-input select-input--blue" defaultValue="">
              <option value="" disabled>Choose languages*</option>
              {languageDict.map((language) => (
                <option key={language.id} value={language.language}>{language.language}</option>
              ))}
          </select>
          <div className="form--multi-select">
            {newApplicant.languages.map((language, index): any => 
            <div key={language} className="form--select-tag">
              <span className="before-icon">
                {language}
              </span>
              <FiX onClick={() => removeLanguage(index)} className="lib-icon link"/>
            </div>)}
          </div>

          <select name="subjects" onChange={handleSelect} className="select-input select-input--blue" defaultValue="">
              <option value="" disabled>Choose subjects*</option>
              {subjectsDict.map((subject) => (
                <option key={subject.id} value={subject.subject}>{subject.subject}</option>
              ))}
          </select>
          <div className="form--multi-select">
            {newApplicant.subjects.map((subject, index): any => 
            <div key={subject} className="form--select-tag">
              <span className="before-icon">
                {subject}
              </span>
              <FiX onClick={() => removeSubject(index)} className="lib-icon link"/>
            </div>)}
          </div>
          <button>Attach Resume</button>
          <button type="submit">Apply</button>
        </form>
        
        <p>Already have an account? Login <Link to={'/login'}>here</Link></p>
        <Link to={'/'} className="btn btn--blue">Home</Link>
      </div>
    </div>
  )
}