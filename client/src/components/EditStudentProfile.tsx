import { useState, FormEvent, FC } from 'react'
import { emptyStudent } from '../interfaces/Student';

interface Props {
  setEditing: (editing: boolean) => void
}

export const EditStudentProfile: FC<Props> = ({setEditing}: Props) => {
  const [student, setStudent] = useState(emptyStudent);

  const handleStudentChange = (event: {target: {name: string, value: any}}) => {
    setStudent(current => ({...current, [event.target.name]: event.target.value}))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setEditing(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Change First Name</label>
        <input type="text" id="fname" name="firstName" onChange={handleStudentChange} value={student.firstName} placeholder="First Name" required />
        <label>Change Last Name</label>
        <input type="text" id="lname" name="lastName" onChange={handleStudentChange}  value={student.lastName} placeholder="Last Name" required/>
        <label>Change Email</label>
        <input type="email" id="email" name="email" onChange={handleStudentChange} value={student.email} placeholder="Email" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
