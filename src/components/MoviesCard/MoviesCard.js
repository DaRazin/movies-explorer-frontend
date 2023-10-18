import { useContext} from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./MoviesCard.css";

function MoviesCard({ movie }) {
  const { handleSaveMovie, handleDeleteMovie, ifMovies } =
    useContext(CurrentUserContext);
  return (
    <section className="card">
      <a href={movie?.trailerLink} target="blank">
        <img className="card__image" src={movie.image} alt={movie.nameRU} />
      </a>
      {movie._id 
        ?<span className={!ifMovies ? "card__button-delete" : "card__icon-saved"}  
          onClick={() => {handleDeleteMovie(movie)}}></span>
        :<span
          className="card__button-save"
          type="button"
          onClick={() => handleSaveMovie(movie)}
        >
          Сохранить
        </span>
      }
      <div className="card__info">
        <h1 className="card__title">{movie.nameRU}</h1>
        <div className="card__film-duration">{`${(movie.duration / 60) | 0}ч ${movie.duration % 60}м`}</div>
      </div>
    </section>
  );
}

export default MoviesCard;
