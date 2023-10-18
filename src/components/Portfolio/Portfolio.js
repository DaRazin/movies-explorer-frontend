import "./Portfolio.css";

function Portfolio() {
  return(
    <section className="portfolio">
      <h1 className="portfolio__title">Портфолио</h1>
      <nav className="portfolio__nav">
        <a href="https://github.com/DaRazin/how-to-learn" target="_blank" className="portfolio__nav-block" rel="noreferrer">
          <p className="portfolio__nav-block_el_text">Статичный сайт</p>
          <p className="portfolio__nav-block_el_text">↗</p>
        </a>
        <a href="https://darazin.github.io/russian-travel/index.html" target="_blank" className="portfolio__nav-block" rel="noreferrer">
          <p className="portfolio__nav-block_el_text">Адаптивный сайт</p>
          <p className="portfolio__nav-block_el_text">↗</p>
        </a>
        <a href="https://github.com/DaRazin/how-to-learn" target="_blank"  className="portfolio__nav-block" rel="noreferrer">
          <p className="portfolio__nav-block_el_text">Одностраничное приложение</p>
          <p className="portfolio__nav-block_el_text">↗</p>
        </a>
      </nav>
    </section>
  )
}

export default Portfolio;