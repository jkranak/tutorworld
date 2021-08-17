import { FormEvent, ReactElement, useState } from 'react'
import { StudentComplete } from '../interfaces/Student';

interface Props {
  setEditing: (editing: boolean) => void,
  student: StudentComplete | null
}

export function EditStudentProfile ({setEditing, student}: Props): ReactElement<Props> {
  const [editedUser, setEditedUser] = useState(student);

  const handleStudentChange = (event: {target: {name: string, value: any}}) => {
    setEditedUser((current: any) => ({...current, [event.target.name]: event.target.value}))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setEditing(false);
  }

  return (
    <div className="form edit-form">
      <form onSubmit={handleSubmit} >
        <label>Change First Name</label>
        <input type="text" id="fname" name="firstName" onChange={handleStudentChange} value={editedUser?.firstName} placeholder="First Name" required 
        className="text-input text-input--blue"
        />
        <label>Change Last Name</label>
        <input type="text" id="lname" name="lastName" onChange={handleStudentChange}  value={editedUser?.lastName} placeholder="Last Name" required
        className="text-input text-input--blue"
        />
        <label>Change Email</label>
        <input type="email" id="email" name="email" onChange={handleStudentChange} value={editedUser?.email} placeholder="Email" required 
        className="text-input text-input--blue"
        />
        <button type="submit" className="btn btn--blue form--btn">Submit</button>
      </form>
    </div>
  )
}
