import {useState, FC} from 'react';
import {Navbar} from '../components/Navbar';
import {SearchResult} from '../components/SearchResult';
import {FullTutor} from '../interfaces/Tutor'
import { languages, subjects } from '../assets/subjects_languages';

export const Search: FC = () => {
  const allTutors: FullTutor[] = [{
    id: 1,
    email: 'tutor@tutory',
    firstName: 'Tutor1',
    lastName: 'Tutory1',
    description: 'Im tutor1',
    experience: 'Lots',
    imageURL: '',
    resumeURL: '',
    rating: 4,
    education: 'Tutor U',
    price: 50,
    subjects: ["Math - Elementary", "Biology - High School"],
    languages: ["Hindi", "German"]
  },
  {
    id: 2,
    email: 'tutor2@tutory',
    firstName: 'Tutor2',
    lastName: 'Tutory2',
    description: 'Im tutor 2',
    experience: 'Lots and lots',
    imageURL: '',
    resumeURL: '',
    rating: 3,
    education: 'Tutor College',
    price: 40,
    subjects: ["English - University", "SAT"],
    languages: ["English", "Portuguese"]
  }]
  const [filteredTutors, setFilteredTutors] = useState(allTutors);

  const filterBySubject = (event: {target: {name: string, value: any}}) => {
    const sortedTutors = allTutors.filter(tutor => tutor.subjects.includes(event.target.value));
    setFilteredTutors(sortedTutors);
  }

  const filterByLanguage = (event: {target: {name: string, value: any}}) => {
    const sortedTutors = allTutors.filter(tutor => tutor.languages.includes(event.target.value));
    setFilteredTutors(sortedTutors);
  }

  const sortByPrice = () => {
    let sortedTutors = allTutors.slice(0);
    sortedTutors.sort((a, b) => a.price - b.price);
    setFilteredTutors(sortedTutors);
  }

  const sortByRating = () => {
    let sortedTutors = allTutors.slice(0);
    sortedTutors.sort((a, b) => b.rating - a.rating);
    setFilteredTutors(sortedTutors);
  }

  return (
    <div>
      <Navbar />
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
      {filteredTutors.map(tutor => (
        <li key={tutor.id}>
          <SearchResult tutor={tutor}/>
        </li>
      ))}
    </div>
  )
}
