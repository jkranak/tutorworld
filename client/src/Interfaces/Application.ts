export interface ApplicationI {
  firstName: string,
  lastName: string,
  email: string,
  languages: Number[],
  subjects: Number[],
  about: string
}

export const emptyApplication: ApplicationI = {
  firstName: '',
  lastName: '',
  email: '',
  languages: [],
  subjects: [],
  about: ''
}