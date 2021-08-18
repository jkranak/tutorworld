export interface Availability {
  id: number
  monday: number[]
  tuesday: number[]
  wednesday: number[]
  thursday: number[]
  friday: number[]
  saturday: number[]
  sunday: number[]
}

export const emptyAvailability: Availability = {
  id: 0,
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
}