export interface RoomI {
  room: string,
  senders: SenderI[]
}

interface SenderI {
  UserId: string,
  createdAt: string,
  firstName: string,
  id: string,
  imageUrl: string,
  lastName: string,
  role: string,
  updatedAt: string
}