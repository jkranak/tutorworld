export interface ApplicationI {
  firstName: string,
  lastName: string,
  email: string,
  languages: number[],
  subjects: number[],
  resume: string
}
export const emptyApplication: ApplicationI = {
  firstName: '',
  lastName: '',
  email: '',
  languages: [],
  subjects: [],
  resume: ''
}
