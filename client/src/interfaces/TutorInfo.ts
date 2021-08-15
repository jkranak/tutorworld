export interface TutorInfo {
  tutorId: number,
  description: string,
  experience: string,
  imageURL: string,
  resumeURL: string,
  rating: number,
  education: string,
  price: number
}

export const emptyTutorInfo: TutorInfo = {
  tutorId: 0,
  description: '',
  experience: '',
  imageURL: '',
  resumeURL: '',
  rating: 0,
  education: '',
  price: 0
}