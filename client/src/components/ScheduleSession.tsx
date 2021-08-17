import { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import { emptyAvailability } from '../interfaces/Availability';
import { convertHourArr } from '../assets/convertHour';
import { useEffect } from 'react';

export const ScheduleSession = () => {
  const [availability, setAvailability] = useState(emptyAvailability);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [pickTime, setPickTime] = useState(false);
  const [timesArr, setTimesArr] = useState(['']);
  const [selectedHour, setSelectedHour] = useState(0);
  
  const daysAhead = 60;
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  function addDays (days: number) {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + days));
  }
  
  useEffect(() => {
    if (selectedDay === null) setPickTime(false)
    else {
      const dayOfWeek = daysOfWeek[selectedDay.getDay()];
      const availabilityArr = availability[dayOfWeek];
      setTimesArr(availabilityArr);
      setPickTime(true);
    }
  }, [selectedDay])

  const handleChange = (event: {target: {value: any}}) => {
    setSelectedHour(event.target.value);
  }
  console.log(selectedHour)
  return (
    <div>
      <DatePicker 
        onChange={setSelectedDay}
        value={selectedDay}
        format="MMM dd, y"
        maxDate={addDays(daysAhead)}
        minDetail="month"
      />
      <form>
     <select name="hour" onChange={handleChange} defaultValue="0">
     <option value="" selected disabled hidden>Choose time</option>
      {pickTime && timesArr.map((time, index) => (
        <option key={index} value={time}>{convertHourArr[time]}</option>
      ))}
      </select>
       </form>
       {selectedHour > 0 && <Link to={'/checkout'}>Schedule and pay</Link>}
    </div>
  )
}
