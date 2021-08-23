import {FC} from 'react'

interface Props {
  sessionInfo: {
    type: string
    name: string
    image: string
    date: string
    time: string
    cost: number
    context: string
    rating?: string
    review?: string
  }
}

export const SessionDetailStudent: FC<Props> = ({sessionInfo}: Props) => {
  return (
    <div>
      
    </div>
  )
}
