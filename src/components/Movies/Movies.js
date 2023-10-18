import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MovieCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./Movies.css";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
import { searchMovies } from "../../utils/searchMovies";
import { moviesApi } from "../../utils/Api/MoviesApi";

function Movies(props) {
  const { isLoading, movies : allMovies, onSearch } = useContext(CurrentUserContext);

  const [isShort, setIsShort] = useState(false);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   moviesApi.getMovies()
  //   .then((res) => {
  //     setMovies(res);
  //   })
  //   .catch((err) => {
  //     console.log(`Ошибка: ${err}`);
  //   })
  // }, [props.isLoggedIn])

  const handleSearch = (query) => {
    handleSearchMovie(query)
    onSearch()
  }

  const handleSearchMovie = (query) => {
    if (query) {
      setMovies(searchMovies(allMovies, query));
    } else {
      setMovies([]);
    }
    setSearch(query);
    localStorage.setItem("searchMoviesText", query);
};
const handleIsShort = (is) => {
	setIsShort(is)
	localStorage.setItem("isShort", is);
  }

  useEffect(() => {
    const searchMoviesText = localStorage.getItem("searchMoviesText");
    if (searchMoviesText && searchMoviesText.length && allMovies.length) {
      handleSearchMovie(searchMoviesText);
    } else {
		setMovies([])
	}
	const isShortLocal = localStorage.getItem("isShort");
    if (isShortLocal) {
		handleIsShort(isShortLocal === 'true');
    }
  }, [allMovies]);
  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} />
      <main className="main">
        <SearchForm
          onChangeShort={handleIsShort}
          shortStatus={isShort}
          handleSearch={handleSearch}
          value={search}
          title="Фильмы"
        />
        <section className="movies">
        {isLoading ? (
        <Preloader />
        ) : (
        <MoviesCardList movies={movies} search={search} isShort={isShort} />
        )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
