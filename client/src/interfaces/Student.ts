export interface Student {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  imageUrl: string
  
}

export interface StudentComplete extends Student{
  createdAt: string,
  updatedAt: string
}

export const emptyStudent: Student = {
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
  imageUrl: '',
}