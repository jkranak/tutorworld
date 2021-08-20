export interface AvailabilityDays {
  sunday: object
  monday: object
  tuesday: object
  wednesday: object
  thursday: object
  friday: object
  saturday: object
}

export interface Availability extends AvailabilityDays {
  TutorId: string
  createdAt: string
  id: string

  updatedAt: string
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

