import {useState, FC} from 'react';
import {Navbar} from '../components/Navbar';
import {SearchResult} from '../components/SearchResult';
import { languages, subjects } from '../assets/subjects_languages';

export const Search: FC = () => {
  // TO-DO fix typescript anys
  const allTutors: any = [{
    id: 1,
    email: 'tutor@tutory',
    firstName: 'Tutor1',
    lastName: 'Tutory1',
    TutorInfo: {
      TutorId: 1,
      description: 'Im tutor1',
      experience: 'Lots',
      imageUrl: '',
      rating: 4,
      education: 'Tutor U',
      price: 50,
      subjects: ["Math - Elementary", "Biology - High School"],
      languages: ["Hindi", "German"],
      createdAt: '',
      updatedAt: ''
    },
    createdAt: '',
    updatedAt: ''
  },
  {
    id: 2,
    email: 'tutor2@tutory',
    firstName: 'Tutor2',
    lastName: 'Tutory2',
    description: 'Im tutor 2',
    experience: 'Lots and lots',
    imageUrl: '',
    rating: 3,
    education: 'Tutor College',
    price: 40,
    subjects: ["English - University", "SAT"],
    languages: ["English", "Portuguese"],
    createdAt: '',
    updatedAt: ''
  }]
  const [filteredTutors, setFilteredTutors] = useState(allTutors);

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
      {filteredTutors.map((tutor: any) => (
        <li key={tutor.id}>
          <SearchResult tutor={tutor}/>
        </li>
      ))}
    </div>
  )
}
