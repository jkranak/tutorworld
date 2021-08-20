export interface Session {
  StudentId: string
  TutorId: string
  cost: number
  createdAt: string
  date: string
  id: string
  sessionContext: string
  time: string
  updatedAt: string
}

export const emptySession: Session = {
  StudentId: '',
  TutorId: '',
  cost: 0,
  createdAt: '',
  date: '',
  id: '',
  sessionContext: '',
  time: '',
  updatedAt: '',
}