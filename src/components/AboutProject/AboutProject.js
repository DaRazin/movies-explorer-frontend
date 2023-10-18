import "./AboutProject.css";

function AboutProject() {
  return(
    <section id="about-project" className="about-project">
      <h1 className="about-project__title">О проекте</h1>
      <div className="about-project__border"></div>
      <div className="about-project__text-content">
        <div className="about-project__text-content_column">
          <h2 className="about-project__text-content_title">Дипломный проект включал 5 этапов</h2>
          <p className="about-project__text-content_paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__text-content_column">
          <h2 className="about-project__text-content_title">На выполнение диплома ушло 5 недель</h2>
          <p className="about-project__text-content_paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__duration">
        <div className="about-project__duration_time-block_backend">1 неделя</div>
        <div className="about-project__duration_time-block_frontend">4 недели</div>
        <div className="about-project__duration_text-block_backend">Back-end</div>
        <div className="about-project__duration_text-block_frontend">Front-end</div>
      </div>
    </section>
  )
}

export default AboutProject;