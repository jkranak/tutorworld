export interface Student {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  imageURL: string
}

export const emptyStudent: Student = {
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
  imageURL: ''
}