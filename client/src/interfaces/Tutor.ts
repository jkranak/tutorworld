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
// TO-DO update 
export interface TutorWithAvailability extends TutorComplete {
  availability: {
    TutorId: string,
    createdAt: string,
    updatedAt: string,
    id: string,
    sunday: any,
    monday: any,
    tuesday: any,
    wednesday: any,
    thursday: any,
    friday: any,
    saturday: any
  }
}