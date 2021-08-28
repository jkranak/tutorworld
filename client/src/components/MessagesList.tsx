import { useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { MessageCompleteI } from '../interfaces/Message'
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../redux/store/store';
import { UserAuth } from '../interfaces/User';

interface Props {
  messagesList: MessageCompleteI[],
  sendMessage: Function
}

export const MessagesList = ({ messagesList, sendMessage }: Props) => {
  const user: UserAuth = useSelector((state: RootState) => state.authenticate);
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
            <span>{new Date(message.createdAt).toLocaleDateString() !== new Date().toLocaleDateString() 
              ? `${new Date(message.createdAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}, ${new Date(message.createdAt).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit', hour12: true})}` 
              : new Date(message.createdAt).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit', hour12: true})}</span>
            <span></span>
          </div>
        )}
      </div>
        <div className="messages__content--send-message">
          <input type="text" name="message" value={message} onChange={(event) => setMessage(event.target.value)}/>
          <button ><FiChevronRight onClick={handleMessage}/></button>
        </div>
    </div>
  )
}
