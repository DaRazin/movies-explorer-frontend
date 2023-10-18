import "./NavTab.css";

function NavTab() {
  return (
    <nav className="navtab">
      <a href="#about-project" className="button navtab__button">О проекте</a>
      <a href="#techs" className="button navtab__button">Технологии</a>
      <a href="#student" className="button navtab__button">Студент</a>
    </nav>
  )
}

export default NavTab;