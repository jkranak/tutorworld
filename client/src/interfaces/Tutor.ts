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