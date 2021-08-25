import { useState, useEffect, FC } from 'react';
import { Navbar } from '../components/Navbar';
import { SearchResult } from '../components/SearchResult';
import { languages, subjects } from '../assets/subjects_languages';
import { getAllTutors } from '../services/apiUser';
import { TutorWithAvailability } from '../interfaces/Tutor';
import { dayNames } from '../assets/times';
import { Link } from 'react-router-dom';

export const Search: FC = () => {
  const [allTutors, setAllTutors] = useState<TutorWithAvailability[]>([]);
  // TO-DO fix typescript anys
  const [filteredTutors, setFilteredTutors] = useState<TutorWithAvailability[]>([]);
  const [ weekday, setWeekday ] = useState<string>('');

  useEffect(() => {
    getAllTutors().then(res => {
      setAllTutors(res);
      setFilteredTutors(res);
    })
  }, [])

  const filterBySubject = (event: {target: {name: string, value: string}}) => {
    if (event.target.value === 'all') {
      setFilteredTutors(allTutors);
    } else {
      const filteredTutors = allTutors.filter((tutor: TutorWithAvailability) => tutor?.subjectLevels.includes(event.target.value));
      setFilteredTutors([...filteredTutors]);
    }
  }

  const filterByLanguage = (event: {target: {name: string, value: string}}) => {
    if (event.target.value === 'all') {
      setFilteredTutors(allTutors);
    } else {
      const filteredTutors = allTutors.filter((tutor: TutorWithAvailability) => tutor?.languages.includes(event.target.value.toLowerCase()));
      setFilteredTutors([...filteredTutors]);
    }
  }

  const filterAvailability = (event: {target: {name: string, value: string}}) => {
    if (event.target.value === 'all') {
      setFilteredTutors(allTutors);
      setWeekday('');
    } else {
      const filtered = allTutors.filter((tutor: TutorWithAvailability) => {
        return Object.keys(tutor.availability[event.target.value]).length
      })
      setFilteredTutors([...filtered]);
      setWeekday(event.target.value);
    }
  }

  const filterByHour = (event: {target: {name: string, value: string}}) => {
    const filtered = allTutors.filter((tutor: TutorWithAvailability) => tutor.availability[weekday][event.target.value] === true)
    setFilteredTutors([...filtered]);
  }

  const displayHourlyAvailability = () => {
    let hours: string[] = [];
    filteredTutors.forEach((tutor: TutorWithAvailability) => {
      Object.entries(tutor.availability[weekday]).forEach(hour => {
        (hour[1] === true && !hours.includes(hour[0])) && hours.push(hour[0]);
      });
    })
    return hours;
  }

  const handleSort = (event: {target: {name: string, value: string}}) => {
    if (event.target.value === 'rate-highest') {
      sortByPrice('highest');
    } else if (event.target.value === 'rate-lowest') {
      sortByPrice('lowest');
    } else {
      sortByRating();
    }
  }

  const sortByPrice = (sortBy: string) => {
    if (sortBy === 'highest') {
      const sorted = filteredTutors.sort((a: TutorWithAvailability, b: TutorWithAvailability) => b.price - a.price);
      setFilteredTutors([...sorted]);
    } else if (sortBy === 'lowest') {
      const sorted = filteredTutors.sort((a: TutorWithAvailability, b: TutorWithAvailability) => a.price - b.price);
      setFilteredTutors([...sorted]);
    }
  }

  const sortByRating = () => {
    const sorted = filteredTutors.sort((a: TutorWithAvailability, b: TutorWithAvailability) => b.rating - a.rating);
    setFilteredTutors([...sorted]);
  }
  return (
    <div className="search">
      <Navbar/>
      <main className="search__content">
        <section className="search__filters">
          <div className="search__filters--inputs">
            <select name="subjects" onChange={filterBySubject} defaultValue="" className="select-input" >
              <option value="" disabled>Subject/level</option>
              <option value="all">All Subjects</option>
              {subjects.map((subject: string, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>

            <select name="languages" onChange={filterByLanguage} defaultValue="" className="select-input">
              <option value="" disabled >Language</option>
              <option value="all">All Languages</option>
              {languages.map((language: string, index) => (
                <option key={index} value={language}>{language}</option>
              ))}
            </select>

            <select name="weekday-availability" onChange={filterAvailability} defaultValue="" className="select-input">
              <option value="" disabled >Weekday Availability</option>
              <option value="all">All days</option>
              {dayNames.map((day: string, index) => (
                <option key={index} value={day}>{day}</option>
              ))}
            </select>
            <Link to={'/map'} className="search-by-location">Search by location</Link>
            {
              weekday &&
                <select name="hour-availability" onChange={filterByHour} defaultValue="" className="select-input">
                  <option value="" disabled >Hour Availability</option>
                  {displayHourlyAvailability().map((hour: string, index) => (
                  <option key={index} value={hour}>{hour}</option>
                  ))}
              </select>
            }
          </div>
          <select onChange={handleSort} className="sort-input">
            <option value="rating">Sort by Rating</option>
            <option value="rate-highest">Sort by Highest Rate</option>
            <option value="rate-lowest">Sort by Lowest Rate</option>
          </select>
        </section>
        <section className="search__results">
          {filteredTutors.map((tutor: TutorWithAvailability) => (
            <SearchResult key={tutor.id} tutor={tutor} />
          ))}
        </section>
      </main>
  </div>
  )
}
