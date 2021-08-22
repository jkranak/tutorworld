import { FC, useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import '../sass/calendar/styles.scss';
import { getUserSessions } from '../services/apiUser';
import { Session } from '../interfaces/Session';
import { Navbar } from '../components/Navbar';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {'en-US': enUS}
})

interface dateObj {
  title: string
  start: Date
  end: Date
}

const timeConvert = (date: string, time: string): dateObj => {
  let dateRes;
  let timeArr = time.match(/([0-9]+):([0-9]+) ([A-Z]+)/);
  if (timeArr![1] === '12' && timeArr![3] === 'AM') dateRes = new Date(`${date} 00:${timeArr![2]}`)
  else if (timeArr![1] === '12') dateRes = new Date(`${date} 12:${timeArr![2]}`)
  else if (timeArr![3] === 'PM') {
    dateRes = new Date(`${date} ${(Number(timeArr![1]) + 12).toString()}:${timeArr![2]}`);
  }
  else dateRes = new Date(`${date} ${timeArr![1]}:${timeArr![2]}`);
  const endTime = new Date(Number(dateRes) + 3600000);
  return {
    title: 'tutoring session',
    start: dateRes,
    end: endTime
  };
}

export const CalendarPage: FC = () => {
  const [dateArr, setDateArr] = useState([]);

  useEffect(() => {
    getUserSessions().then(res => {
      setDateArr(res.map((sess: Session) => timeConvert(sess.date, sess.time)))
    })
  }, [])

  return (
    <div>
    <Navbar />
    <Calendar
      localizer={localizer}
      events={dateArr}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 700 }}
      defaultView={Views.WEEK}
      views={['week', 'month', 'agenda']}
    />
  </div>
  )
}
