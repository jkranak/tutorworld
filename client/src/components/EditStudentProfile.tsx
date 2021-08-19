import { ReactElement, useState } from 'react'
import { UserDetails } from '../interfaces/User';
import { updateStudent } from '../services/apiUser';

interface Props {
  student: UserDetails
  setEditing: (editing: boolean) => void
  setUserDetails: (details: UserDetails) => void
}

export function EditStudentProfile ({ student, setEditing, setUserDetails }: Props): ReactElement<Props> {
  const [editedUser, setEditedUser] = useState(student);
  const handleStudentChange = (event: {target: {name: string, value: string}}) => {
    setEditedUser((current: UserDetails) => ({...current, [event.target.name]: event.target.value}));
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();  
    const res = await updateStudent(editedUser);
      if (res === "Student updated") {
        setUserDetails(editedUser);
        setEditing(false);
      }
  }

  return (
    <div className="form edit-form">
      <form onSubmit={handleSubmit} >
        <div className="form--title">
          <h1>Edit Profile</h1>
        </div>
        {/* TO-DO include update photo */}
        <label>First Name*</label>
        <input type="text" id="fname" name="firstName" onChange={handleStudentChange} value={editedUser?.firstName} placeholder="First Name" required 
        className="text-input text-input--blue"
        />
        <label>Last Name*</label>
        <input type="text" id="lname" name="lastName" onChange={handleStudentChange}  value={editedUser?.lastName} placeholder="Last Name" required
        className="text-input text-input--blue"
        />
        <label>Email*</label>
        <input type="email" id="email" name="email" onChange={handleStudentChange} value={editedUser?.email} placeholder="Email" required 
        className="text-input text-input--blue"
        />
        <button type="submit" className="btn btn--blue form--btn">Submit</button>
      </form>
    </div>
  )
}
