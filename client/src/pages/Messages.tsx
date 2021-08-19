import { MessagesContainer } from "../components/MessagesContainer"
import { Navbar } from "../components/Navbar"

export const Messages = () => {
  return (
    <div className="messages">
      <Navbar />
      <MessagesContainer />
    </div>
  )
}
