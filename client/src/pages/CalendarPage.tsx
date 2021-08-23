import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import '../sass/calendar/styles.scss';
import { getUserSessions } from '../services/apiUser';
import { SessionComplex } from '../interfaces/Session';
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
  desc: string
}

interface EventObj {
  event: dateObj
}

const timeConvert = (session: SessionComplex, role: string): dateObj => {
  let dateRes;
  let timeArr = session.time.match(/([0-9]+):([0-9]+) ([A-Z]+)/);
  if (timeArr![1] === '12' && timeArr![3] === 'AM') dateRes = new Date(`${session.date} 00:${timeArr![2]}`)
  else if (timeArr![1] === '12') dateRes = new Date(`${session.date} 12:${timeArr![2]}`)
  else if (timeArr![3] === 'PM') {
    dateRes = new Date(`${session.date} ${(Number(timeArr![1]) + 12).toString()}:${timeArr![2]}`);
  }
  else dateRes = new Date(`${session.date} ${timeArr![1]}:${timeArr![2]}`);
  const endTime = new Date(Number(dateRes) + 3600000);
  const name = role === 'tutor' 
    ? `${session.Student.firstName} ${session.Student.lastName}`
    : `${session.Tutor.firstName} ${session.Tutor.lastName}`
  return {
    title: name,
    start: dateRes,
    end: endTime,
    desc: session.sessionContext
  };
}

export const CalendarPage: FC = () => {
  const [dateArr, setDateArr] = useState([]);
  const user = useSelector((state: any) => state.authenticate);

  useEffect(() => {
    getUserSessions().then(res => {
      setDateArr(res.map((sess: SessionComplex) => timeConvert(sess, user.role)))
    })
  }, [user.role])

  function Event({ event }: EventObj) {
    return (
      <span>
        <strong>{event.title}</strong>
      </span>
    )
  }
  
  function EventAgenda({ event }: EventObj) {
    return (
      <span>
        <em style={{ color: '#EA4C89' }}>{event.title}</em>
        <p>{event.desc}</p>
      </span>
    )
  }



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
      components={{
        event: Event,
        agenda: {
          event: EventAgenda,
        },
      }}
    />
  </div>
  )
}
