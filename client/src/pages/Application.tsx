import { useState } from 'react'
import { emptyApplication } from '../interfaces/Application';
import languageDict from '../assets/languageDictionary.json';
import subjectDict from '../assets/subjectDictionary.json';
import {AfterApplication} from '../components/AfterApplication';
import {Link} from 'react-router-dom';

interface Props {
  
}

export const Application = (props: Props) => {
  const [newApplicant, setNewApplicant] = useState(emptyApplication)
  const [submitted, setSubmitted] = useState(false);
  
  function handleChange (event: {target: {name: string, value: any}}) {
    const newApplicantFill: any = {...newApplicant}
    if (event.target.name === 'languages') {
      newApplicantFill['languages'].push(Number(event.target.value));
    }
    else if (event.target.name === 'subjects') {
      newApplicantFill['subjects'].push(Number(event.target.value));
    } else {
      newApplicantFill[event.target.name] = event.target.value;
    }
    setNewApplicant(newApplicantFill)
  }
  
  function handleSubmit () {
    setSubmitted(true);
  }

  return ( 
    <>
    {submitted ? <AfterApplication /> :
      <div>
      <form onSubmit={handleSubmit}>
        <label>First name</label>
        <input type="text" id="firstname" name="firstName" required onChange={handleChange} value={newApplicant.firstName}/>
        <label>Last name</label>
        <input type="text" id="lastname" name="lastName" required onChange={handleChange} value={newApplicant.lastName}/>
        <label>Email</label>
        <input type="text" id="email" name="email" required onChange={handleChange} value={newApplicant.email}/>
        {newApplicant['languages'] && newApplicant['languages']}
        <select name="languages" onChange={handleChange}>
            {Object.entries(languageDict).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
         </select>
         <select name="subjects" onChange={handleChange}>
            {Object.entries(subjectDict).map(([key, value]) => (
              <option key={value} value={key}>{value}</option>
            ))}
         </select>
         <label>Tell us about yourself</label>
         <input type="text" id="about" name="about" required onChange={handleChange} value={newApplicant.about}/>
         <button>Attach Resume</button>
        <button type="submit">Apply</button>
      </form>
    </div>}
    <Link to={'/'}>Go to Home</Link>
    </>
  )
}