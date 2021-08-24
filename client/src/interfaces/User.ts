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

export interface UserAuth extends UserRole {
  SenderId: string
}

export interface UserNameImage {
  firstName: string
  lastName: string
  imageUrl: string
}

export const emptyUserNameImage: UserNameImage = {
  firstName: '',
  lastName: '',
  imageUrl: ''
}
