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
  monday: [1],
  tuesday: [2, 5, 13],
  wednesday: [3],
  thursday: [],
  friday: [5],
  saturday: [],
  sunday: [7],
}