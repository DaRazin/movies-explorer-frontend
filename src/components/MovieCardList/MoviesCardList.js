import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useResize } from "../../utils/hooks/UseResize";
import { SHORT_MOVIE } from "../../utils/constants";

function MoviesCardList({ movies, onSave, onDelete, isShort, search }) {
  const [visibleCards, setVisibleCards] = useState(12);
  const [loadMoreCards, setLoadMoreCards] = useState(3);
  const { countMovies } = useResize();
  const location = useLocation();

  useEffect(() => {
    const { total, more } = countMovies;
    if (total) {
      setVisibleCards(total);
      setLoadMoreCards(more);
    }
  }, [countMovies]);

  const totalMovies = movies.filter(
    (item) => !isShort || item.duration <= SHORT_MOVIE
  );

  const handleLoadMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + loadMoreCards);
  };
  const cards =
    location.pathname === "/saved-movies" ? totalMovies.length : visibleCards;

  return (
    <>
      <section className="card-list">
        {totalMovies &&
          totalMovies
            .slice(0, cards)
            .map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie.id || movie._id}
                onSaveMovie={onSave}
                onDelete={onDelete}
              />
            ))}
      </section>
      <div className="card-list-more">
        {totalMovies.length === 0 && search.length > 0 && (
          <span className="card-list-no">Ничего не найдено</span>
        )}
        {totalMovies.length > visibleCards &&
          location.pathname === "/movies" && (
            <button
              onClick={handleLoadMore}
              className="movies__more-button"
              type="button"
            >
              Еще
            </button>
          )}
      </div>
    </>
  );
}

export default MoviesCardList;
