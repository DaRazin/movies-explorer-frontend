import "./AboutMe.css";
import me from "../../images/me.jpg"

function AboutMe() {
  return(
    <section id="student" className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__border"></div>
      <div className="about-me__info">
        <div className="about-me__info_block_text">
          <h1 className="about-me__name">Даниил</h1>
          <h2 className="about-me__subtitle">Фронтенд-разработчик, 24 года</h2>
          <p className="about-me__text">Я родился в городе Выкса, в 18 лет переехал в Москву, где закончил Российский технолигический университет МИРЭА. Я люблю слушать музыку и заниматься спортом. С 2021 года работаю в компании «КРОК».</p> 
          <a href="https://github.com/DaRazin" className="about-me__git">GitHub</a>
        </div>
        <img src={ me } className="about-me__info_block_photo" alt="Фото"/>
      </div>
    </section>
  )
}

export default AboutMe;