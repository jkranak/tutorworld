import Board from '../components/call/Board'
import VideoPlayer from '../components/call/VideoPlayer'
import { Navbar } from '../components/Navbar'

export const Call = () => {
  return (
    <div className="call">
      <Navbar />
      <div className="call__content">
        <div className="container board">
          <div className="board-container">
            <Board />
          </div>
        </div>
        <VideoPlayer />
      </div>
    </div>
  )
}
