import { FC } from 'react';
import chalkboard from '../assets/chalkboard.jpg';
import remote from '../assets/remote.png';
import book from '../assets/book.jpg';
import logo from '../assets/tutor_world.svg';

export const LandingBody: FC = () => {
  return (
    <div className="landing__body">
      <div className="landing__body--box">
        <div className="image-box">
          <img src={chalkboard} alt="teacher at chalkboard"></img>
        </div>
        <div className="landing__body--text">
          <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet blanditiis pariatur laborum! Beatae, officia distinctio! Aliquam illum itaque porro unde? Modi possimus eum, esse pariatur maiores dolorum odit recusandae excepturi!</h2>
        </div>
      </div>
        <div className="landing__body--box">
          <div className="landing__body--text">
            <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam assumenda reprehenderit corporis laboriosam fugit voluptas eligendi! Sequi iure, aut voluptatibus debitis, quos eligendi aspernatur, ratione atque earum delectus consequatur blanditiis.</h2>
          </div>
          <div className="image-box">
            <img src={remote} alt="student learning online"></img>
          </div>
        </div>
        <div className="landing__body--box">
          <div className="image-box">
            <img src={book} alt="book and glasses"></img>
          </div>
          <div className="landing__body--text">
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam provident recusandae dicta asperiores, alias officiis, voluptatem vel aspernatur vitae quae nobis. Fugit delectus, cupiditate quisquam totam praesentium consequatur temporibus repudiandae!</h2>
          </div>
        </div>
        {/* <img src={logo} alt="tutor world logo" className="logo-box__image"/> */}
    </div>
  )
}
