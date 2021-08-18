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
  createdAt: string
  updatedAt: string
  TutorInfo : TutorInfo
}

export interface TutorInfo extends TutorComplete {
  TutorId: number,
  description: string,
  experience: string,
  imageUrl: string,
  resumeUrl: string,
  rating: number,
  education: string,
  price: number,
  createdAt: string
  updatedAt: string
  subjects: string[]
  languages: string[]
}

// export const emptyTutorAndInfo: Complete = {
//   id: 0,
//   email: '',
//   firstName: '',
//   lastName: '',
//   description: '',
//   experience: '',
//   imageURL: '',
//   resumeURL: '',
//   rating: 0,
//   education: '',
//   price: 0
// }