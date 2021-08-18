export interface Tutor {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
}

export const emptyTutor: Tutor = {
  id: 0,
  email: '',
  firstName: '',
  lastName: ''
}

export interface TutorAndInfo extends Tutor {
  description: string,
  experience: string,
  imageURL: string,
  resumeURL?: string,
  rating: number,
  education: string,
  price: number
}

export const emptyTutorAndInfo: TutorAndInfo = {
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
  description: '',
  experience: '',
  imageURL: '',
  resumeURL: '',
  rating: 0,
  education: '',
  price: 0
}

export interface FullTutor extends TutorAndInfo {
  subjects: string[]
  languages: string[]
}