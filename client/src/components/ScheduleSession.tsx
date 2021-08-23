import { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {getOneTutorAvailability} from '../services/apiUser';
import { useSelector } from 'react-redux';
import { dayNames } from '../assets/times';


export const ScheduleSession: FC = () => {
  const [selectedDay, setSelectedDay] = useState(new Date(0));
  const [pickTime, setPickTime] = useState(false);
  const [timesArr, setTimesArr] = useState(['']);
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const user = useSelector((state: any )=> state.currentTutorInfo);

  const daysAhead = 69 - new Date().getDay();
  const endDate = new Date(Date.now() + 86400000 * daysAhead);

  useEffect(() => {
    if (selectedDay < new Date()) {
      setPickTime(false);
      setSelectedHour('');
    } else {
      const dateStr = selectedDay.toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
      getOneTutorAvailability(user.id, dateStr).then(res => {
        setPickTime(false);
        setTimesArr(res);
        setPickTime(true);
        setSelectedHour('');
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
    <div className="schedule__content--scheduler">
      <DayPicker 
        fromMonth={new Date()} 
        toMonth={endDate} 
        selectedDays={selectedDay} 
        onDayClick={setSelectedDay}
        disabledDays={unavailableDays()}
      />
      <div className="form edit-form">
      {pickTime && timesArr.length ? 
        <select name="hour" defaultValue="" onChange={handleHourChange} className="select-input select-input--blue">
          <option value="" disabled>Choose time</option>
            {timesArr.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
        </select>
       : null}
      {selectedHour.length > 0 && 
        <select name="subject" defaultValue="" onChange={handleTopicChange} className="select-input select-input--blue">
          <option value="" disabled>Choose subject</option>
          {user.subjectLevels.map((subject: any) => (
            <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>}

        <div className="form--multi-select">
          {selectedHour ? 
            <div className="form--select-tag">
              <span>{selectedHour}</span>
            </div> : null 
          }
          {selectedTopic ?
            <div className="form--select-tag">
              <span>{selectedTopic}</span>
            </div> : null
          }
        </div>

       {pickTime && timesArr.length === 0 ? <div>All Slots Booked</div> : null}

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
      }} className="btn btn--clear form--btn pay">Schedule and pay</Link>}
      {pickTime && <button onClick={() => {
        setSelectedHour('');
        setPickTime(false);
        setSelectedTopic('');
        setSelectedDay(new Date(0));
      }} className="btn btn--clear form--btn">Clear selection</button>}
      </div>
    </div>
  )
}
