import { useState, useEffect, FC } from 'react';
import { Navbar } from '../components/Navbar';
import { SearchResult } from '../components/SearchResult';
import { languages, subjects } from '../assets/subjects_languages';
import { getAllTutors } from '../services/apiUser';
import {deepCopyTutorAvail} from '../services/deepCopy';
import { TutorWithAvailability } from '../interfaces/Tutor';
import { dayNames } from '../assets/times';
import { Link } from 'react-router-dom';

export const Search: FC = () => {
  const [allTutors, setAllTutors] = useState<TutorWithAvailability[]>([]);
  const [filteredTutors, setFilteredTutors] = useState<TutorWithAvailability[]>(deepCopyTutorAvail(allTutors));
  const [subject, setSubject] = useState('');
  const [language, setLanguage] = useState('');
  const [weekday, setWeekday] = useState<string>('');
  const [hour, setHour] = useState('');

  useEffect(() => {
    getAllTutors().then(res => {
      setAllTutors(res);
      setFilteredTutors(res);
    })
  }, [])

  const fullFilter = (subjectF: string, languageF: string, weekDayF: string, hourF: string) => {
    let newFilteredTutors = deepCopyTutorAvail(allTutors);
    if (subjectF.length > 0) newFilteredTutors = newFilteredTutors.filter((tutor) => tutor.subjectLevels.includes(subjectF));
    if (languageF.length > 0) newFilteredTutors = newFilteredTutors.filter((tutor) => tutor.languages.includes(languageF));
    if (weekDayF.length > 0) newFilteredTutors = newFilteredTutors.filter((tutor) => Object.keys(tutor.availability[weekDayF]).length);
    if (hourF.length > 0) newFilteredTutors = newFilteredTutors.filter((tutor) => tutor.availability[weekDayF][hourF] === true);
    return newFilteredTutors;
  }

  const resetSearch = () => {
    setFilteredTutors(deepCopyTutorAvail(allTutors));
    setLanguage('');
    setSubject('');
    setWeekday('');
    setHour('');
  }

  const filterBySubject = (event: {target: {name: string, value: string}}) => {
    setSubject(event.target.value);
    setFilteredTutors(fullFilter(event.target.value, language, weekday, hour));
  }

  const filterByLanguage = (event: {target: {name: string, value: string}}) => {
    setLanguage(event.target.value);  
    setFilteredTutors(fullFilter(subject, event.target.value, weekday, hour));
  }

  const filterAvailability = (event: {target: {name: string, value: string}}) => {
    setWeekday(event.target.value);
    setFilteredTutors(fullFilter(subject, language, event.target.value, hour));    
  }

  const filterByHour = (event: {target: {name: string, value: string}}) => {
    setHour(event.target.value)
    setFilteredTutors(fullFilter(subject, language, weekday, event.target.value));  
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
      <Navbar />
        <main className="search__content">
          <section className="search__filters">
            <div className="search__filters--inputs">
              <select name="subjects" onChange={filterBySubject} value={subject} className="select-input" >
                <option value="" disabled>Subject/level</option>
                {subjects.map((subject: string, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>

              <select name="languages" onChange={filterByLanguage} value={language} className="select-input">
                <option value="" disabled >Language</option>
                {languages.map((language: string, index) => (
                  <option key={index} value={language}>{language}</option>
                ))}
              </select>

              <select name="weekday-availability" onChange={filterAvailability} value={weekday} className="select-input">
                <option value="" disabled >Weekday Availability</option>
                {dayNames.map((day: string, index) => (
                  <option key={index} value={day}>{day}</option>
                ))}
              </select>
              {
                weekday &&
                  <select name="hour-availability" onChange={filterByHour} value={hour} className="select-input">
                    <option value="" disabled >Hour Availability</option>
                    {displayHourlyAvailability().map((hour: string, index) => (
                    <option key={index} value={hour}>{hour}</option>
                    ))}
                </select>
              }
              <button onClick={resetSearch} className="btn btn--clear">Reset Search</button>
              <Link to={'/map'} className="search-by-location">Search by location</Link>
            </div>
            <select onChange={handleSort} className="sort-input">
              <option value="rating">Sort by Rating</option>
              <option value="rate-highest">Sort by Highest Rate</option>
              <option value="rate-lowest">Sort by Lowest Rate</option>
            </select>
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
