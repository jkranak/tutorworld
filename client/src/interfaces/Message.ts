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

export const emptyMessageCompleteI: MessageCompleteI = {
  RoomId: '',
  SenderId: '',
  content: '',
  createdAt: '',
  id: '',
  updatedAt: ''
}