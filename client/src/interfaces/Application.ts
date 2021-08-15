export interface ApplicationI {
  firstName: string,
  lastName: string,
  email: string,
  languages: number[],
  subjects: number[],
  // about: string,
  resume: string
}
// TO-DO verify typescript type for files
export const emptyApplication: ApplicationI = {
  firstName: '',
  lastName: '',
  email: '',
  languages: [],
  subjects: [],
  // about: '',
  resume: ''
}
