import { Availability, emptyAvailability } from './Availability';

export interface UserLogin {
  email: string,
  password: string
}

export const emptyUserLogin: UserLogin = {
  email: '',
  password: ''
}

export interface User extends UserLogin {
  firstName: string,
  lastName: string,
  confirmPassword?: string
}

export const emptyUser: User = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export interface UserDetails {
  TutorId?: string
  availability?: Availability
  createdAt: string
  description?: string
  education?: string
  email: string
  experience?: string
  firstName: string
  id: string
  imageUrl: string
  languages?: string[]
  lastName: string
  price?: number
  rating?: number
  subjectLevels?: string[]
  updatedAt: string
}

export const emptyUserDetails: UserDetails = {
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