import biancaImg from '../assets/bianca.jpg'
import rahmatImg from '../assets/rahmat.jpg'
import josephImg from '../assets/joseph.jpg'

interface Props {
  
}

export const About = (props: Props) => {
  return (
    <div className="about">
      <h1>We are three coding ninjas with skills on both back end and front end.</h1>
      <div className="about--box">
          <img src={biancaImg} alt="bianca" width="250px"></img>
          <h2>Bianca</h2>
        </div>
        <div className="about--box">
          <h2>Rahmat</h2>
          <img src={rahmatImg} width="250px" alt="Rahmat"></img>
        </div>
        <div className="about--box">
          <img src={josephImg} width="250px" alt="Joseph"></img>
          <h2>Joseph</h2>
        </div>
    </div>
  )
}
