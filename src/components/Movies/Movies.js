import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MovieCardList/MoviesCardList";
import Footer from "../Footer/Footer"
import "./Movies.css"

function Movies(props) {
  return(
    <>
      <main className="main">
        <Header 
          isLoggedIn = { props.isLoggedIn }
        />
        <SearchForm />
        <section className="movies">
          <MoviesCardList />
          <button className="movies__more-button">Ещё</button>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Movies;