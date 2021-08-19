import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {getOneTutorAvailability} from '../services/apiUser';
import { useSelector } from 'react-redux';


export const ScheduleSession = () => {
  const [selectedDay, setSelectedDay] = useState(new Date(0));
  const [pickTime, setPickTime] = useState(false);
  const [timesArr, setTimesArr] = useState(['']);
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const user = useSelector((state: any )=> state.currentTutorInfo);

  const daysAhead = 69 - new Date().getDay();
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const endDate = new Date(Date.now() + 86400000 * daysAhead);


  useEffect(() => {
    if (selectedDay < new Date()) {
      setPickTime(false);
      setSelectedHour('');
    } else {
      const dateStr = selectedDay.toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
      getOneTutorAvailability(user.id, dateStr).then(res => {
        setTimesArr(res);
        setPickTime(true);
      })
    }
  }, [selectedDay])

  const unavailableDays = () => {
    let daysOfWeek: number[] = [];
    for (let day in user.availability) {
      if (Object.values(user.availability[day]).length === 0) {
        daysOfWeek.push(dayNames.indexOf(day))
      }
    }
    const disabledDays: any[] = [{daysOfWeek}]
    disabledDays.push({before: new Date(), after: endDate})
    return disabledDays
  }

  const handleHourChange = (event: {target: {value: any}}) => {
    setSelectedHour(event.target.value);
  }

  const handleTopicChange = (event: {target: {value: any}}) => {
    setSelectedTopic(event.target.value);
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
      {pickTime && timesArr.length ? <form>
        <select name="hour" defaultValue="" onChange={handleHourChange} >
        <option value="" disabled hidden>Choose time</option>
          {timesArr.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </form> : <></>}
       {pickTime && timesArr.length === 0 ? <button disabled>All Slots Booked</button> : <></>}
      {selectedHour.length > 0 && <form>
        <select name="subject" defaultValue="" onChange={handleTopicChange} >
          <option value="" disabled hidden>Choose subject</option>
          {user.subjectLevels.map((subject: any) => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </form>}
      {selectedTopic.length > 0 && <Link to={{
        pathname:'/checkout', 
        state:{
          tutorId: user.id,
          price: user.price,
          topic: selectedTopic,
          time: selectedHour,
          day: selectedDay.toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }),
          name: `${user.firstName} ${user.lastName}`
        }
      }}>Schedule and pay</Link>}
      {pickTime && <button onClick={() => {
        setSelectedHour('');
        setPickTime(false);
        setSelectedTopic('');
        setSelectedDay(new Date(0));
      }}>Clear selection</button>}
    </div>
  )
}
