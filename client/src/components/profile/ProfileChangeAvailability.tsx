import { useState, FC, FormEvent } from 'react';
import { FiX } from 'react-icons/fi';
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
  const [hourPicked, setHourPicked] = useState(false);

  const handleDayChange = (event: {target: {value: string}}) => {
    setChooseDay(event.target.value);
  }

  const handleHourChange = (event: {target: {value: string}}) => {
    if (chooseHours[0]?.length === 0) setChooseHours([event.target.value]);
    else setChooseHours(current => ([...current, event.target.value]));
    setHourPicked(true);
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const updatedAvail = deepCopy(newAvailability);
    for (let hour of chooseHours) {
      updatedAvail[chooseDay][hour] = true;
    }
    setNewAvailability(updatedAvail);
    setSaveMessage(true);
    setHourPicked(false);
  }

  const deleteHour = (day: string, hour: string) => {
    const updatedAvail = deepCopy(newAvailability);
    delete updatedAvail[day][hour];
    setNewAvailability(updatedAvail);
    setSaveMessage(true);
  }

  const removeHours = (hour: any) => {
    if (chooseHours.length === 1) {
      setChooseHours(['']);
      setHourPicked(false);
    } else {
      const newSubjectList = chooseHours.filter((h)=> h !== hour );
      setChooseHours(newSubjectList);
    }
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
      setChangeAvail(false);
      setHourPicked(false);
    }
  }

  return (
    <div className="form edit-form">
      <h1>Add Availability</h1>
      <form id="availability" onSubmit={handleSubmit}>
      <select name="selectday" onChange={handleDayChange} defaultValue="" className="select-input select-input--blue">
          <option value="" disabled>Choose Day</option>
          {capitalDayNames.map((day, index) => (
            <option key={day} value={dayNames[index]}>{day}</option>
          ))}
        </select>
        {chooseDay.length ? <>
          <select name="selecthour" defaultValue="" onChange={handleHourChange} className="select-input select-input--blue">
            <option value="" disabled>Choose hour(s)</option>
            {hours.map(hour => (
              <option key={hour} value={hour}>{hour}</option>
            ))}
          </select>
          <div className="form--multi-select">
            {hourPicked && chooseHours.map((hour) => 
              <div key={hour} className="form--select-tag">
                <span className="before-icon">{hour}</span>
                <FiX onClick={() => removeHours(hour)} className="lib-icon link"/>
              </div>)}
        </div>
        </> : null}
        {hourPicked && <button type="submit" className="btn btn--blue form--btn">Add selected hours</button>}
      </form>
      <h1>Delete Availability</h1>
      <div className="form--multi-select multi-select-availability">
          {dayNames.map((day, index) => (
            <div key={day} className="hello">
              <span className="form--select-title">{capitalDayNames[index]}: </span>
              {Object.keys(newAvailability[day])
              .sort((a, b) => hours.indexOf(a) - hours.indexOf(b))
              .map(hour => (
              <div className="form--select-tag" key={hour}>
                <span className="before-icon">{hour}</span>
                <FiX className="lib-icon link" onClick={() => deleteHour(day, hour)}/>
              </div>
            ))}
            </div>
          ))}
      </div>
          {saveMessage && <>
            <span>Changes have not been saved. To save press Save All Changes</span>
            <button onClick={() => setNewAvailability(deepCopy(tutorDetails.availability))}>Revert all changes</button>
          </>}
          <button onClick={handleSave}>Save All Changes</button>
    </div>
  )
}
