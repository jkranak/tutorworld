import {useState, useEffect, FC} from 'react';
import {Navbar} from '../components/Navbar';
import {SearchResult} from '../components/SearchResult';
import { languages, subjects } from '../assets/subjects_languages';
import {getAllTutors, getAllTutorsAvailability} from '../services/apiUser';
import DayPicker from 'react-day-picker';
import moment from 'moment';

export const Search: FC = () => {
  const [allTutors, setAllTutors] = useState([]);
  // TO-DO fix typescript anys
  const [filteredTutors, setFilteredTutors] = useState([]);
  const daysAhead = 60 + 9 - new Date().getDay();
  const endDate = new Date(Date.now() + 86400000 * daysAhead);
  const [selectedDay, setSelectedDay] = useState(new Date(0));
  const [allAvailability, setAllAvailability] = useState([]);

  useEffect(() => {
    getAllTutors().then(res => {
      setAllTutors(res);
      setFilteredTutors(res);
      console.log(res)
    })
    getAllTutorsAvailability().then(res => {
      console.log('all availability', res);
      setAllAvailability(res);
    })
  }, [])

  const filterBySubject = (event: {target: {name: string, value: any}}) => {
    if (event.target.value === 'all') {
      setFilteredTutors(allTutors);
    } else {
      const filteredTutors = allTutors.filter((tutor: any) => tutor?.subjectLevels.includes(event.target.value));
      setFilteredTutors([...filteredTutors]);
    }
  }

  const filterByLanguage = (event: {target: {name: string, value: any}}) => {
    if (event.target.value === 'all') {
      setFilteredTutors(allTutors);
    } else {
      const filteredTutors = allTutors.filter((tutor: any) => tutor?.languages.includes(event.target.value.toLowerCase()));
      setFilteredTutors([...filteredTutors]);
    }
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
      const sorted = filteredTutors.sort((a: any, b: any) => b.price - a.price);
      setFilteredTutors([...sorted]);
    } else if (sortBy === 'lowest') {
      const sorted = filteredTutors.sort((a: any, b: any) => a.price - b.price);
      setFilteredTutors([...sorted]);
    }
  }

  const sortByRating = () => {
    const sorted = filteredTutors.sort((a: any, b: any) => b.rating - a.rating);
    setFilteredTutors([...sorted]);
  }

  const handleSelectDay = (date: any) => {
    const dayOfTheWeek = moment(date).format('dddd');
    const filteredByDay = allTutors?.filter((tutor: any) => Object.keys(tutor.availability[dayOfTheWeek.toLowerCase()]).length)
    setFilteredTutors(filteredByDay);
  }

  return (
    <div className="search">
      <Navbar />
      <main className="search__content">
        <section className="search__filters">
          <div className="search__filters--inputs">
            <select name="subjects" onChange={filterBySubject} defaultValue="" className="select-input" >
              <option value="" disabled>Subject/level</option>
              <option value="all">All Subjects</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>

            <select name="languages" onChange={filterByLanguage} defaultValue="" className="select-input">
              <option value="" disabled >Language</option>
              <option value="all">All Languages</option>
              {languages.map((language, index) => (
                <option key={index} value={language}>{language}</option>
              ))}
            </select>

            <select name="availability" onChange={filterByLanguage} defaultValue="" className="select-input">
              <option value="" disabled >Availability</option>
              {/* {languages.map((language, index) => (
                <option key={index} value={language}>{language}</option>
              ))} */}
              <option value="option" >option</option>
            </select>
            <DayPicker 
              fromMonth={new Date()} 
              toMonth={endDate}
              selectedDays={selectedDay} 
              // filter function ondayclick
              onDayClick={handleSelectDay}
              disabledDays={[{before: new Date(), after: endDate}]}
            />
          </div>
          <select onChange={handleSort} className="sort-input">
            <option value="rating">Sort by Rating</option>
            <option value="rate-highest">Sort by Highest Rate</option>
            <option value="rate-lowest">Sort by Lowest Rate</option>
          </select>
        </section>
        <section className="search__results">
          {filteredTutors.map((tutor: any) => (
            <SearchResult key={tutor.id} tutor={tutor}/>
          ))}
        </section>
      </main>
    </div>
  )
}
