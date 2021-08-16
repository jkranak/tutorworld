import { useState } from 'react';
import {Link} from 'react-router-dom';
import { emptyApplication } from '../interfaces/Application';
import languageDict from '../assets/languageDictionary.json';
import subjectsDict from '../assets/subjectDictionary.json';
import { FiBookOpen, FiX } from 'react-icons/fi';

export const Application = () => {
  const [newApplicant, setNewApplicant] = useState(emptyApplication)
  const [submitted, setSubmitted] = useState(false);
  
  function handleChange (event: {target: {name: string, value: any}}) {
    const newApplicantFill: any = {...newApplicant}
    if (event.target.name === 'languages') {
      newApplicantFill['languages'].push(Number(event.target.value));
    }
    else if (event.target.name === 'subjects') {
      newApplicantFill['subjects'].push(event.target.value);
    } else {
      newApplicantFill[event.target.name] = event.target.value;
    }
    setNewApplicant(newApplicantFill)
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
          <FiBookOpen className="fa-icon form--icon"/>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" id="fname" name="firstName" required onChange={handleChange} value={newApplicant.firstName} placeholder="First Name*" className="text-input text-input--blue"/>
          <input type="text" id="lname" name="lastName" required onChange={handleChange} value={newApplicant.lastName} placeholder="Last Name*" className="text-input text-input--blue"/>
          <input type="email" id="email" name="email" required onChange={handleChange} value={newApplicant.email} placeholder="E-mail*" className="text-input text-input--blue"/>
          <select name="languages" onChange={handleChange}>
              <option value="" selected disabled hidden>Choose languages</option>
              {languageDict.map((language) => (
                <option key={language.id} value={language.id}>{language.language}</option>
              ))}
          </select>
          {newApplicant.languages.map((language, index): any => 
          <div key={language}>
            <span>
              {languageDict[language - 1].language}
            </span>
            <FiX onClick={() => removeLanguage(index)}/>
          </div>)}

          <select name="subjects" onChange={handleChange}>
              <option value="" selected disabled hidden>Choose subjects</option>
              {subjectsDict.map((subject) => (
                <option key={subject.id} value={subject.id}>{subject.subject}</option>
              ))}
          </select>
          {newApplicant.subjects.map((subject, index): any => 
          <div key={subject}>
            <span>
            {subjectsDict[subject - 1].subject}
            </span>
            <FiX onClick={() => removeSubject(index)}/>
          </div>)}
          <label>Attach Resume</label>
          <input type="file" id="resume" accept=".doc, .docx, .pdf"/>
          <button type="submit">Apply</button>
        </form>
        
        <p>Already have an account? Login <Link to={'/login'}>here</Link></p>
        <Link to={'/'} className="btn btn--blue">Home</Link>
      </div>
    </div>
  )
}