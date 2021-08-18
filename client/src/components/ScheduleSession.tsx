import { useState } from 'react';
import { Link } from 'react-router-dom';
import { emptyAvailability } from '../interfaces/Availability';
import { convertHourArr } from '../assets/convertHour';
import { useEffect } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export const ScheduleSession = () => {
  const [availability, setAvailability] = useState(emptyAvailability);
  const [selectedDay, setSelectedDay] = useState(new Date(0));
  const [pickTime, setPickTime] = useState(false);
  const [timesArr, setTimesArr] = useState(['']);
  const [selectedHour, setSelectedHour] = useState(25);
  
  const daysAhead = 60 + 9 - new Date().getDay();
  const endDate = new Date(Date.now() + 86400000 * daysAhead);
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  const unavailableDays = () => {
    let daysOfWeek: number[] = [];
    for (let day in availability) {
      if (availability[day].length === 0) {
        daysOfWeek.push(dayNames.indexOf(day))
      }
    }
    const disabledDays: any[] = [{daysOfWeek}]
    disabledDays.push({before: new Date(), after: endDate})
    return disabledDays
  }

  useEffect(() => {
    if (selectedDay < new Date()) {
      setPickTime(false);
      setSelectedHour(25);
    } else {
      const dayOfWeek = dayNames[selectedDay.getDay()];
      const availabilityArr = availability[dayOfWeek];
      setTimesArr(availabilityArr);
      setPickTime(true);
    }
  }, [selectedDay])

  const handleChange = (event: {target: {value: any}}) => {
    setSelectedHour(event.target.value);
  }
  
  return (
    <div>
      <DayPicker 
        fromMonth={new Date()} 
        toMonth={endDate} 
        selectedDays={selectedDay} 
        onDayClick={setSelectedDay}
        disabledDays={unavailableDays()}
      />
    {pickTime && <form>
    <select name="hour" defaultValue="" onChange={handleChange} >
     <option value="" disabled hidden>Choose time</option>
       {timesArr.map((time, index) => (
        <option key={index} value={time}>{convertHourArr[time]}</option>
      ))}
      </select>
       </form>}
       {selectedHour < 25 && <Link to={'/checkout'}>Schedule and pay</Link>}
       {pickTime && <button onClick={() => {
         setSelectedHour(25);
         setPickTime(false);
         setSelectedDay(new Date(0));
       }}>Clear selection</button>}

    </div>
  )
}
