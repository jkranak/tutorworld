export interface MessageI {
  RoomId: string
  SenderId: string
  content: string
}

export interface MessageCompleteI extends MessageI{
  createdAt: string
  id: string
  updatedAt: string
}