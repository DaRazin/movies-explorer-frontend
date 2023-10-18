export const searchMovies = (movies, query) => {
  const loverQuery = query.toLowerCase();


  return movies.filter(
    (movie) =>
      movie.nameRU.toLowerCase().indexOf(loverQuery) !== -1 ||
      movie.nameEN.toLowerCase().indexOf(loverQuery) !== -1
  );
};
