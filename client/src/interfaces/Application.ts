export interface ApplicationI {
  firstName: string,
  lastName: string,
  email: string,
  languages: number[],
  subjects: string[],
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
