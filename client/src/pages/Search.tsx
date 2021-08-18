import {useState, useEffect, FC} from 'react';
import {Navbar} from '../components/Navbar';
import {SearchResult} from '../components/SearchResult';
import { languages, subjects } from '../assets/subjects_languages';
import {getAllTutors} from '../services/apiUser';

export const Search: FC = () => {
  const [allTutors, setAllTutors] = useState([]);
  // TO-DO fix typescript anys
  const [filteredTutors, setFilteredTutors] = useState([]);

  useEffect(() => {
    getAllTutors().then(res => {
    setAllTutors(res);
    setFilteredTutors(res);
  })}, []
  )

  const filterBySubject = (event: {target: {name: string, value: any}}) => {
    const sortedTutors = allTutors.filter((tutor: any) => tutor?.TutorInfo.subjects.includes(event.target.value));
    setFilteredTutors(sortedTutors);
  }

  const filterByLanguage = (event: {target: {name: string, value: any}}) => {
    const sortedTutors = allTutors.filter((tutor: any) => tutor?.TutorInfo.languages.includes(event.target.value));
    setFilteredTutors(sortedTutors);
  }

  const sortByPrice = () => {
    let sortedTutors = allTutors.slice(0);
    sortedTutors.sort((a: any, b: any) => a.TutorInfo.price - b.TutorInfo.price);
    setFilteredTutors(sortedTutors);
  }

  const sortByRating = () => {
    let sortedTutors = allTutors.slice(0);
    sortedTutors.sort((a: any, b: any) => b.TutorInfo.rating - a.TutorInfo.rating);
    setFilteredTutors(sortedTutors);
  }

  return (
    <div className="search">
      <Navbar />
      <main className="search__content">
        <section className="search__filters">
          <form id="subjectfilter">
          <select name="subjects" onChange={filterBySubject} defaultValue="" >
                  <option value="" disabled>Subject/level</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>{subject}</option>
                  ))}
              </select>
          </form>
          <form id="languagefilter">
          <select name="languages" onChange={filterByLanguage} defaultValue="" >
                  <option value="" disabled>Language</option>
                  {languages.map((language, index) => (
                    <option key={index} value={language}>{language}</option>
                  ))}
              </select>
          </form>
          <button onClick={sortByPrice}>Sort by Rate</button>
          <button onClick={sortByRating}>Sort by Rating</button>
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
