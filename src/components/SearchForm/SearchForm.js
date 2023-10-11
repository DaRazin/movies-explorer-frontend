import "./SearchForm.css";
import imageButton from "../../images/icon_search_button.svg";

function SearchForm() {
  return (
    <section className="search">
      <div className="search__wrapper">
        <form className="search__form">
        <input className="search__input" type="search" autoComplete="off" placeholder="Фильм"/>
        <button className="search__button" type="submit">
          <div className="search__button-inside">
            <img className="search__button-image" src={imageButton} alt="Кнопка поиска"/>
          </div>
        </button>
        </form>
        <div className="search__switch-block">
          <label className="search__switch">
            <input className="search__switch-input" type="checkbox" />
            <span className="search__switch-slider search__switch-slider-round" />
         </label>
          <p className="search__switch-text">Короткометражки</p>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;