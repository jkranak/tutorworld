export interface MediaStream {
  active: boolean
  id: string
  onactive?: any
  onaddtrack?: any
  oninactive?: any
  onremovetrack?: any
}

export const emptyMediaStream: MediaStream = {
  active: false,
  id: ''
}