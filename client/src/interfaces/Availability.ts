export interface Availability {
  TutorId: string
  createdAt: string
  friday: object
  id: string
  monday: object
  saturday: object
  sunday: object
  thursday: object
  tuesday: object
  updatedAt: string
  wednesday: object
}

export const emptyAvailability: Availability = {
  TutorId: '',
  createdAt: '',
  friday: {},
  id: '',
  monday: {},
  saturday: {},
  sunday: {},
  thursday: {},
  tuesday: {},
  updatedAt: '',
  wednesday: {}
}