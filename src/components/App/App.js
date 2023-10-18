import "./App.css";
import {Routes, Route } from "react-router-dom";
import Main from "../Main/Main"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";

function App() {
  const isLoggedIn = true; // меняет header
  return (
    <div className="page">
      <Routes>
				<Route path="/" element={ <Main isLoggedIn = { isLoggedIn } /> }/>
				<Route path="/movies" element={ <Movies isLoggedIn = { isLoggedIn }/> } />
        <Route path="/saved-movies" element={<SavedMovies isLoggedIn = { isLoggedIn }/>}/>
        <Route path="/profile" element={<Profile isLoggedIn = { isLoggedIn }/>}/>
        <Route path="/signup" element={<Register />}/>
        <Route path="/signin" element={<Login />}/>
        <Route path="/*" element={<NotFound />}/>
      </Routes>
    </div>
  )
}

export default App;