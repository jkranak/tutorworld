export interface UserLogin {
  email: string,
  password: string
}

export const emptyUserLogin: UserLogin = {
  email: '',
  password: ''
}

export interface User extends UserLogin {
  firstName: string,
  lastName: string,
  passwordConfirm?: string
}

export const emptyUser: User = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: ''
}