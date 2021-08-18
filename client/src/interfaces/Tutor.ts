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

export interface TutorComplete extends Tutor {
  TutorId: number,
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