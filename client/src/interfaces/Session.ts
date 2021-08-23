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

export interface HistoryComplex extends HistoryI {
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