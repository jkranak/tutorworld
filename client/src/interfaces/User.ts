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
  confirmPassword?: string
}

export const emptyUser: User = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export interface UserRole {
  id: string
  role: string
}

export const emptyUserRole: UserRole = {
  id: '',
  role: ''
}
