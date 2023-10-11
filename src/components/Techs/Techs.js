import "./Techs.css";

function Techs() {
  return(
    <section id="techs" className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__border"></div>
      <div className="techs__text-content">
        <h1 className="techs__text-content_block_title">7 технологий</h1>
        <h2 className="techs__text-content_block_subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</h2>
      </div>
      <div className="techs__blocks">
        <div className="techs__block">HTML</div>
        <div className="techs__block">CSS</div>
        <div className="techs__block">JS</div>
        <div className="techs__block">React</div>
        <div className="techs__block">Git</div>
        <div className="techs__block">Express.js</div>
        <div className="techs__block">mongoDB</div>
      </div>
    </section>
  )
}

export default Techs;