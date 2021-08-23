import { useState, FC, FormEvent } from 'react';
import { hours, dayNames, capitalDayNames } from '../../assets/times';
import { AvailabilityDays, Availability } from '../../interfaces/Availability';
import { TutorWithAvailability } from '../../interfaces/Tutor';
import { updateAvailability } from '../../services/apiUser';

interface Props {
  tutorDetails: TutorWithAvailability
  setTutorDetails: (tutor: TutorWithAvailability) => void
  setChangeAvail: (change: boolean) => void
}

function deepCopy (availObj: AvailabilityDays) {
  return {
    sunday: {...availObj.sunday},
    monday: {...availObj.monday},
    tuesday: {...availObj.tuesday},
    wednesday: {...availObj.wednesday},
    thursday: {...availObj.thursday},
    friday: {...availObj.friday},
    saturday: {...availObj.saturday},
  }
}

export const ProfileChangeAvailability: FC<Props> = ({tutorDetails, setTutorDetails, setChangeAvail}: Props) => {
  const [chooseDay, setChooseDay] = useState('');
  const [chooseHours, setChooseHours] = useState(['']);
  const [newAvailability, setNewAvailability] = useState(deepCopy(tutorDetails.availability));
  const [saveMessage, setSaveMessage] = useState(false);

  const handleDayChange = (event: {target: {value: string}}) => {
    setChooseDay(event.target.value);
  }

  const handleHourChange = (event: {target: {options: any}}) => {
    let selectedHours: string[] = [];
    for (let option of event.target.options) {
      if (option.selected) selectedHours.push(option.value);
    }
    setChooseHours(selectedHours);
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const updatedAvail = deepCopy(newAvailability);
    for (let hour of chooseHours) {
      updatedAvail[chooseDay][hour] = true;
    }
    setNewAvailability(updatedAvail);
    setSaveMessage(true);
  }

  const deleteHour = (day: string, hour: string) => {
    const updatedAvail = deepCopy(newAvailability);
    delete updatedAvail[day][hour];
    setNewAvailability(updatedAvail);
    setSaveMessage(true);
  }

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    const res = await updateAvailability(newAvailability);
    if (res === 201) {
      setChooseDay('');
      setChooseHours([''])
      const newTutorDetails = {...tutorDetails};
      const newTutorAvail: Availability = Object.assign(newTutorDetails.availability, deepCopy(newAvailability));
      newTutorDetails.availability = newTutorAvail;
      setTutorDetails(newTutorDetails);
      setChangeAvail(false)
    }
  }

  return (
    <div>
      <h1>Add Availability</h1>
      <form id="availability" onSubmit={handleSubmit}>
      <select name="selectday" onChange={handleDayChange} defaultValue="" className="select-input select-input--blue">
          <option value="" disabled>Choose Day</option>
          {capitalDayNames.map((day, index) => (
            <option key={day} value={dayNames[index]}>{day}</option>
          ))}
        </select>
        {chooseDay.length > 0 && <>
          <p>Choose hour(s)</p>
          <select multiple name="selecthour" defaultValue={[]} onChange={handleHourChange} >
          {hours.map(hour => (
            <option key={hour} value={hour}>{hour}</option>
          ))}
          </select>
        </>}
        <button type="submit">Add selected hours</button>
      </form>
      <h1>Delete Availability</h1>
      <p>Click on hour to delete</p>
          {dayNames.map((day, index) => (
            <li key={day}>{capitalDayNames[index]}: {Object.keys(newAvailability[day]).map(hour => (
              <button key={hour} onClick={() => deleteHour(day, hour)}>{hour}</button>
            ))}</li>
          ))}
          {saveMessage && <>
            <span>Changes have not been saved. To save press Save All Changes</span>
            <button onClick={() => setNewAvailability(deepCopy(tutorDetails.availability))}>Revert all changes</button>
          </>}
          <button onClick={handleSave}>Save All Changes</button>
    </div>
  )
}
