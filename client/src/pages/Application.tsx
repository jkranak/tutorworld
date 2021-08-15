import { useState } from 'react';
import { emptyApplication } from '../interfaces/Application';
import languageDict from '../assets/languageDictionary.json';
import subjectsDict from '../assets/subjectDictionary.json';
import { FiBookOpen, FiX } from 'react-icons/fi';

export const Application = () => {
  const [newApplicant, setNewApplicant] = useState(emptyApplication)
  const [submitted, setSubmitted] = useState(false);
  
  function handleChange (event: {target: {name: string, value: any}}) {
    console.log('change')
    const newApplicantFill: any = {...newApplicant}
    if (event.target.name === 'languages') {
      newApplicantFill.languages.push(Number(event.target.value));
    }
    else if (event.target.name === 'subjects' && !newApplicant.subjects.includes(event.target.value)) {
      newApplicantFill.subjects.push(event.target.value);
    } else {
      newApplicantFill[event.target.name] = event.target.value;
    }
    setNewApplicant(newApplicantFill)
  }

  const removeSubject = (index: number) => {
    setNewApplicant(current => ({...current, subjects: current.subjects.filter((_, ind)=> ind !== index )}))
  }
  
  function handleSubmit () {}
  const login = '/'
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
          {newApplicant['languages'] && newApplicant['languages']}
          <select name="languages" onChange={handleChange}
          className="select-input select-input--blue">
            <option value="" selected disabled hidden>Choose Language</option>
            {Object.entries(languageDict).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
          <select name="subjects" onChange={handleChange} className="select-input select-input--blue">
              <option value="" selected disabled hidden>Choose subjects</option>
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
        
        <p>Already have an account? Login <a href={login}>here</a></p>
      </div>
    </div>
  )
}