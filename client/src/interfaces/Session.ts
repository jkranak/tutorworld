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

export interface HistoryI extends Session {
  starRating: number
  review: string
}

export const emptyHistory: HistoryI = {
  StudentId: '',
  TutorId: '',
  cost: 0,
  createdAt: '',
  date: '',
  id: '',
  sessionContext: '',
  time: '',
  updatedAt: '',
  starRating: 0,
  review: ''
}