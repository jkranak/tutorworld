import { FormEvent, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { emptyApplication } from '../interfaces/Application';
import { languages, subjects } from '../assets/subjects_languages';
import { FiBookOpen, FiX } from 'react-icons/fi';
import { submitForm } from '../services/formSubmission';
import { Widget } from "@uploadcare/react-widget";
import dotenv from 'dotenv';
import { Logo } from '../components/Logo';
import { AfterApplication } from '../components/AfterApplication';
dotenv.config();

export const Application: FC = () => {
  const uploadCareKey = process.env.REACT_APP_UPLOADCARE_KEY || '';
  const [newApplicant, setNewApplicant] = useState(emptyApplication)
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  function handleSelect (event: {target: {name: string, value: any}}) {
    if (event.target.name === 'languages' && !newApplicant.languages.includes(event.target.value)) {
      setNewApplicant(current => ({...current, languages: [...current.languages, event.target.value]}))
    }
    else if (event.target.name === 'subjects' && !newApplicant.subjects.includes(event.target.value)) {
      setNewApplicant(current => ({...current, subjects: [...current.subjects, event.target.value]}))
    }
  }

  const handleChange = (event: {target: {name: string, value: any}}) => {
    setNewApplicant(current => ({...current, [event.target.name]: event.target.value}))
  }

  const handleAttachment = (file: any) => {
    file.done((info: any) => setNewApplicant(current => ({...current, resume: info.cdnUrl})));
  }

  const removeSubject = (index: number) => {
    setNewApplicant(current => ({...current, subjects: current.subjects.filter((_, ind)=> ind !== index )}))
  }

  const removeLanguage = (index: number) => {
    setNewApplicant(current => ({...current, languages: current.languages.filter((_, ind)=> ind !== index )}))
  }
  
  
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // TO-DO include about
    const { firstName, lastName, email, languages, subjects, resume } = newApplicant;
    if (firstName && lastName && email && languages && subjects && resume) {
      const application = await submitForm(newApplicant);
      if (application.error) {
        // form did not post
        alert(`not successful`)
      } else {
        // reset form information to default
        setNewApplicant(emptyApplication);
        setSubmitted(true);
      }
    } else {
      alert(`Please fill out the entire form`)
    }
  }

  return (
    submitted ? 
      <div className="application">
        <header>
          <Logo />
        </header>
        <AfterApplication />
      </div>
    :
    <div className="application">
      <header>
        <Logo />
      </header>
      <div className="form application-form">
        <div className="form--title">
          <h1 className="before-icon">Application</h1>
          <FiBookOpen className="lib-icon form--icon"/>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" id="fname" name="firstName" required onChange={handleChange} value={newApplicant.firstName} placeholder="First Name*" className="text-input text-input--blue"/>
          <input type="text" id="lname" name="lastName" required onChange={handleChange} value={newApplicant.lastName} placeholder="Last Name*" className="text-input text-input--blue"/>
          <input type="email" id="email" name="email" required onChange={handleChange} value={newApplicant.email} placeholder="E-mail*" className="text-input text-input--blue" />
          <select name="languages" onChange={handleSelect} className="select-input select-input--blue" defaultValue="" required>
              <option value="" selected disabled hidden>Choose languages</option>
              {languages.map((language, index) => (
                <option key={index} value={language}>{language}</option>
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
          <select name="subjects" onChange={handleSelect} className="select-input select-input--blue" defaultValue="" required>
              <option value="" disabled>Choose subjects/level*</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
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
          <div className="text-and-icon">
            <span className="before-icon">Resume: </span>
            <Widget publicKey={uploadCareKey} onFileSelect={(file) => handleAttachment(file)}
            inputAcceptTypes={".odt,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"}
            />
          </div>
          <button type="submit" className="btn btn--blue form--btn">Apply</button>
        </form>
        <p>Already have an account? Login <Link to={'/login'}>here</Link></p>
      </div>
    </div>
  )
}