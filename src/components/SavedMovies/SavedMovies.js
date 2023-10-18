import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import "./SavedMovies.css"
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { searchMovies } from "../../utils/searchMovies";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MovieCardList/MoviesCardList";

function SavedMovies(props) {

  const { savedMovies, isLoading } = useContext(CurrentUserContext);
  const [isShort, setIsShort] = useState(false);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const handleIsShort = (is) => {
    setIsShort(is)
    localStorage.setItem("isShortSave", is);
    }

  const onSearchHandler = (data) => {
    setMovies(searchMovies(savedMovies, data));
    setSearch(data);
  };

  useEffect(() => {
    if (savedMovies) {
      setMovies(searchMovies(savedMovies, search));
    }
  }, [savedMovies]);
  return(
    <>
      <Header 
				isLoggedIn = { props.isLoggedIn }
			/>
      <main className="main">
        <SearchForm
        onChangeShort={handleIsShort}
        shortStatus={isShort}
          handleSearch={onSearchHandler}
          value={search}
          title="Сохранённые фильмы"
        />

        <section className="saved-movies">
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={movies}
            search={search}
            isShort={isShort}
          />
        )}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;