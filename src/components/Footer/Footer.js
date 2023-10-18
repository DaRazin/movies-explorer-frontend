import "./Footer.css";

function Footer() {
  return(
    <section className="footer">
      <p className="footer__text-content">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__border"></div>
      <div className="footer__content">
        <p className="footer__copyright">&copy; 2023</p>
        <div className="footer__nav">
          <a  href="https://practicum.yandex.ru/" className="footer__nav-link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          <a href="https://github.com/DaRazin" className="footer__nav-link" target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>
    </section>
  )
}

export default Footer;