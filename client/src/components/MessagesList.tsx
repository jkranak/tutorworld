import { useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { MessageI } from '../interfaces/Message'

interface Props {
  messagesList: MessageI[],
  sendMessage: Function
}

export const MessagesList = ({ messagesList, sendMessage }: Props) => {
  // retrieve messages
  // TO-DO fix typescript any
  const user = useSelector((state: any) => state.authenticate);
  console.log(user);
  const [message, setMessage] = useState<string>('')
  return (
    <div className="messages__content--right-box">
          <div className="messages__content--messages-list">
            {/* map messagesList */}
            {messagesList && messagesList.map(message => 
              <div className={`messages__content--message--${message.SenderId === user.SenderId ? 'right' : 'left'}`} key={message.id}>
                <span>{message.content}</span>
                <span>{message.createdAt}</span>
              </div>
            )}
          </div>
          <div className="messages__content--send-message">
            <input type="text" name="message" value={message} onChange={(event) => setMessage(event.target.value)}/>
            <button onClick={() => sendMessage(message)}><FiChevronRight /></button>
          </div>
        </div>
  )
}
