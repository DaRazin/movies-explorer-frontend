import "./App.css";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getLocalStorage } from "../../utils/localStorage";
import { mainApi } from "../../utils/Api/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useEffect, useState } from "react";
import { moviesApi } from "../../utils/Api/MoviesApi";
import { IMAGE_PUTH } from "../../utils/constants";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const ifMovies = location.pathname === "/movies";
  // Пользователь
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //  Фильмы
  const [isLoading, setIsLoading] = useState(false); // Загружаю
  const [movies, setMovies] = useState([]); // все фильмы
  const [savedMovies, setSavedMovies] = useState([]); // Cохраненные фильмы
  //  Ошибки
  const [isError, setIsError] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      handleTokenCheck();
    }
  }, []);

  useEffect(() => {
    if (user?._id) {
      getSavedMovies().then((saved) => {
        const mySavedMovies = saved.filter((movie) => movie.owner === user._id);

        setSavedMovies(mySavedMovies);
      });
    }
  }, [user]);

  useEffect(() => {
    const storageMovies = localStorage.getItem(`movies`);
    let newMovies;
    if (storageMovies && JSON.parse(storageMovies).length > 0) {
      newMovies = JSON.parse(storageMovies);
    } else {
      newMovies = movies.map((item) => {
        if (item._id) {
          delete item._id;
        }
        return item;
      });
    }
    
    if (savedMovies.length > 0) {
     newMovies = newMovies.map((movie) => {

        const saved = savedMovies.find((save) => {
          return save.movieId === movie.id;
        });
        
        if (saved) {
          movie._id = saved._id;
        }
        return movie;
      });
    }
    setMovies(newMovies);
  }, [savedMovies]);
  // user

  function handleRegister({ name, email, password }) {
    mainApi
      .register(name, email, password)
      .then((data) => {
        if (data) {
          
          handleLogin({ email, password });
          NotificationManager.info(
            `Пользователь ${name}, успешно зарегистрирован`
          );
        }
      })
      .catch((err) => {
        createErrorUser("register", err);
        NotificationManager.error(
          `Что-то пошло не так! Попробуйте еще раз.`
        );
      
      });
  }

  function handleLogin({ email, password }) {
    mainApi
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        handleTokenCheck();
        NotificationManager.info(
          `Авторизация прошла успешно`
        );
      })
      .catch((err) => {
        createErrorUser("login", err);
        NotificationManager.error(
          `При авторизации произошла ошибка.`
        );
      });
  }

  function handleTokenCheck() {
    const pathname = location.pathname;
    const token = localStorage.getItem("token");
    if (token) {
      mainApi
        .checkToken(token)
        .then((res) => {
          setUser(res);
          setIsLoggedIn(true);
          if (pathname == "/signup" || pathname == "/signin") {
            navigate("/movies", { replace: true });
          } else {
            navigate(pathname, { replace: true });
          }
          return res;
        })
        .catch((err) => {
          createErrorUser("auth", err);
          console.log(err);
        })
        .finally(setIsLoading(false));
    }
  }

  function handleSignOut() {
    localStorage.clear();
    navigate("/signin");
    setIsLoggedIn(false);
    setUser({});
    setSavedMovies([]);
    setMovies([]);

  }

  function handleUpdateInfoUser(data) {
    setIsLoading(true);
    mainApi
      .editUserProfileInfo(data)
      .then((res) => {
        NotificationManager.info(
          `Данные пользователя ${res.name}, успешно изменены`
        );
        setUser(res);
      })
      .catch((err) => {
        NotificationManager.error(`Данные пользователя ${data.name}, Ошибка`);
        createErrorUser("updateUser", err);
      })
      .finally(() => setIsLoading(false));
  }

  function createErrorUser(name, text) {
    setIsError((prev) => ({ ...prev, [name]: text }));
    setTimeout(
      (isError) => {
        delete isError[name];
        setIsError({ ...isError });
      },
      3000,
      isError
    );
  }

  // Movies

  function onSearch() {
    setIsLoading(true);
    getMovies()
      .then((movies) => {
        localStorage.setItem(`movies`, JSON.stringify(movies));

        const newMovies = movies.map((movie) => {
          const isMovies = savedMovies.find(
            (saved) => movie.id == saved.movieId
          );

          if (isMovies) {
            movie._id = isMovies._id;
          }
          return movie;
        });
        setMovies(newMovies);
      })
      .finally(() => setIsLoading(false));
  }
  const getMovies = async () => {
    const data = localStorage.getItem(`movies`);

    if (data && JSON.parse(data).length > 0) {
      const clearData = JSON.parse(data).map((item) => {
        delete item._id;
        return item;
      });
      return Promise.resolve(clearData);
    } else {
      const movies = await moviesApi.getMovies();

      const newMovies = movies.map((movie) => ({
        ...movie,
        image: `${IMAGE_PUTH}/${movie.image.url}`,
        thumbnail: `${IMAGE_PUTH}/${movie.image.formats.thumbnail.url}`,
      }));
      localStorage.setItem(`movies`, JSON.stringify(newMovies));
      return Promise.resolve(newMovies);
    }
  };

  function getSavedMovies() {
    const data = getLocalStorage(`savedMovies`);
    if (data.length > 0) {
      return Promise.resolve(data);
    } else {
      return mainApi.getUserMovies().then((res) => {
        return res;
      });
    }
  }

  function handleSaveMovie(movieCard) {
    mainApi
      .addMovie(movieCard)
      .then((data) => {
        setSavedMovies((prev) => [data, ...prev]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleDeleteMovie(movie) {
    const movieId = movie._id;
    mainApi
      .deleteMovieById(movieId)
      .then(() => {
        const newMovies = savedMovies.filter((m) =>
          m._id == movieId ? false : true
        );
        setSavedMovies(newMovies);
      })
      .catch((err) => {
        console.log("err=>", err);
      });
  }
  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{
          user,
          savedMovies,
          movies,
          isError,
          isLoggedIn,
          isLoading,
          handleSaveMovie,
          handleDeleteMovie,
          onSearch,
          ifMovies,
        }}
      >
        <Routes>
          <Route
            path="/movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={Movies} />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={SavedMovies} />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                isLoggedIn={isLoggedIn}
                onSignOut={handleSignOut}
                onUpdateInfoUser={handleUpdateInfoUser}
              />
            }
          />
          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Register onRegister={handleRegister} />
              )
            }
          />
          <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
      <NotificationContainer />
    </div>
  );
}

export default App;
