import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import film from "../../images/film.jpg"
import { Route } from "react-router-dom";

function MoviesCard() {
  const [isSaved, setIsSaved] = useState(false);
  const location = useLocation();
  function handleClickSaved() {
    setIsSaved(true);
  }

  console.log(isSaved);

  return (
    <section className="card">
      <img className="card__image" src={film} />
      <button className={`${ location.pathname == "/saved-movies" ? 'card__button-delete' : 'card__button-disabled' }`}></button>
      <button className={`${(isSaved || location.pathname == "/saved-movies") ? 'card__button-disabled' : 'card__button-save'}`} type="button" onClick={ handleClickSaved }>Сохранить</button>
      <div className={`${isSaved ? 'card__icon-saved' : 'card__icon-saved-disabled'}`}></div>
      <div className="card__info">
        <h1 className="card__title">Название фильма</h1>
        <div className="card__film-duration">1ч 17м</div>
      </div>
    </section>
  );
}

export default MoviesCard;