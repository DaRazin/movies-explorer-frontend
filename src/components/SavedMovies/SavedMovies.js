import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import Footer from "../Footer/Footer";
import "./SavedMovies.css"

function SavedMovies(props) {
  return(
    <>
      <Header 
				isLoggedIn = { props.isLoggedIn }
			/>
      <SearchForm />
      <section className="saved-movies">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </section>
      <Footer />
    </>
  )
}

export default SavedMovies;