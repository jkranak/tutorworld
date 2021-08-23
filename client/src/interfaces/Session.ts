import {emptyStudent, Student} from './Student';
import { TutorComplex, emptyTutorComplex } from './Tutor';

export interface Session {
  StudentId: string
  TutorId: string
  cost: number
  createdAt?: string
  date: string
  id: string
  sessionContext: string
  time: string
  updatedAt?: string
  sortDate?: number
}


export interface SessionComplex extends Session {
  Student: Student
  Tutor: TutorComplex
}

export const emptySessionComplex: SessionComplex = {
  Student: emptyStudent,
  Tutor: emptyTutorComplex,
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

export interface HistoryComplex extends Session {
  starRating: number
  review: string
  Student: Student
  Tutor: TutorComplex
}

export const emptyHistoryComplex: HistoryComplex = {
  Student: emptyStudent,
  Tutor: emptyTutorComplex,
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

export interface SessionDetail {
  type: string
  name: string
  image: string
  date: string
  time: string
  cost: number
  context: string
  rating: number
  review: string
}