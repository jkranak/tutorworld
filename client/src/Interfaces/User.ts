export interface User {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  passwordConfirm?: string
}

export const emptyUser: User = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: ''
}