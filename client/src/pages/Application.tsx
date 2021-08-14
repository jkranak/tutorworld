import { useState } from 'react'
import {ApplicationI, emptyApplication } from '../Interfaces/Application';
import languages from '../Assets/languageDictionary.json';
import subjects from '../Assets/subjectDictionary.json';

interface Props {
  
}

export const Application = (props: Props) => {
  const [newApplicant, setNewApplicant] = useState(emptyApplication)

  function handleChange (event: {target: {name: string, value: any}}) {
    const languages: Number[] = [];
    const subjects: Number[] = [];
    const newApplicantFill: any = {...newApplicant}
    if (event.target.name === 'languages') {
      languages.push(event.target.value)
      newApplicantFill['languages'] = languages
    };
    if (event.target.name === 'subjects') {
      subjects.push(event.target.value)
      newApplicantFill['subjects'] = subjects
    } else newApplicantFill[event.target.name] = event.target.value;
    setNewApplicant(newApplicantFill)
  }
  function handleSubmit () {}
  const login = '/'
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>First name</label>
        <input type="text" id="fname" name="firstName" required onChange={handleChange} value={newApplicant.firstName}/>
        <label>Last name</label>
        <input type="text" id="lname" name="lastName" required onChange={handleChange} value={newApplicant.lastName}/>
        <label>Email</label>
        <input type="text" id="email" name="email" required onChange={handleChange} value={newApplicant.email}/>
        <select name="languages" multiple>
            {Object.entries(languages).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
         </select>
         <select name="subjects" multiple>
            {Object.entries(subjects).map(([key, value]) => (
              <option key={value} value={key}>{value}</option>
            ))}
         </select>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? Login <a href={login}>here</a></p>
    </div>
  )
}
