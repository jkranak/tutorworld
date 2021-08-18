import { ReactElement, useState } from 'react'
import { StudentComplete } from '../interfaces/Student';
import { updateStudent } from '../services/apiUser';

interface Props {
  student: StudentComplete | null
}

export function EditStudentProfile ({ student }: Props): ReactElement<Props> {
  const [editedUser, setEditedUser] = useState(student);
  const handleStudentChange = (event: {target: {name: string, value: any}}) => {
    setEditedUser((current: any) => ({...current, [event.target.name]: event.target.value}))
  }

  const handleSubmit = async () => {
    if (editedUser?.email && editedUser.firstName && editedUser.lastName) {
      updateStudent(editedUser);
    } else {
      alert(`Please fill out all required fields.`);
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
