import { Availability, emptyAvailability } from './Availability';

export interface Tutor {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
}

export const emptyTutor: Tutor = {
  id: '',
  email: '',
  firstName: '',
  lastName: ''
}

export interface TutorComplete extends Tutor {
  TutorId: string,
  description: string,
  experience: string,
  imageUrl: string,
  rating: number,
  education: string,
  price: number,
  createdAt: string
  updatedAt: string
  subjectLevels: string[]
  languages: string[]
}

export interface TutorWithAvailability extends TutorComplete {
  availability: Availability
}

export const emptyTutorWithAvailability: TutorWithAvailability = {
  TutorId: '',
  availability: emptyAvailability,
  createdAt: '',
  description: '',
  education: '',
  email: '',
  experience: '',
  firstName: '',
  id: '',
  imageUrl: '',
  languages: [''],
  lastName: '',
  price: 0,
  rating: 0,
  subjectLevels: [''],
  updatedAt: ''
}

export interface TutorUpdate {
  firstName: string
  lastName: string
  email: string
  description: string
  experience: string
  imageUrl: string
  education: string
  price: number
  subjectLevels: string[]
  languages: string[]
}

export interface favTutorLoss {
  StudentId: string
  TutorId: string
  createdAt: string
  id: string
  updatedAt: string
}
