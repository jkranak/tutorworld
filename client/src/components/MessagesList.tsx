import { useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { MessageCompleteI } from '../interfaces/Message'
import { v4 as uuidv4 } from 'uuid';

interface Props {
  messagesList: MessageCompleteI[],
  sendMessage: Function
}

export const MessagesList = ({ messagesList, sendMessage }: Props) => {
  // retrieve messages
  // TO-DO fix typescript any
  const user = useSelector((state: any) => state.authenticate);
  const [message, setMessage] = useState<string>('');

  const handleMessage = () => {
    if (message !== '') {
      sendMessage(message, user.SenderId);
      setMessage('');
    }
  }

  return (
    <div className="messages__content--right-box">
          <div className="messages__content--messages-list">
            {messagesList && messagesList.map(message => 
              <div className={`messages__content--message--${message.SenderId === user.SenderId ? 'right' : 'left'}`} key={uuidv4()}>
                <span>{message.content}</span>
                <span>{message.createdAt}</span>
              </div>
            )}
          </div>
          <div className="messages__content--send-message">
            <input type="text" name="message" value={message} onChange={(event) => setMessage(event.target.value)}/>
            <button onClick={handleMessage}><FiChevronRight /></button>
          </div>
        </div>
  )
}
