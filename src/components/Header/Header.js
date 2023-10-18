import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import logo from "../../images/logo.svg"
import "./Header.css";

function Header (props) {

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect (() => {
		setIsMenuOpen(false)
	}, [])

	function handleMenuOpen() {
		setIsMenuOpen(true);
	}

	function handleMenuClose() {
		setIsMenuOpen(false);
		console.log(setIsMenuOpen);
	}

	const location = useLocation();

  return (
  <header className="header">
		<Link to="/">
			<img src={ logo } className="header__logo" alt="Логотип" />
		</Link>
		<div className={props.isLoggedIn ? 'header__hidden-navigate' :'header__nav_type_disable'}>
			<button className="header__navigate-button" onClick={ handleMenuOpen }></button>
			<div className={`header__popup ${isMenuOpen ? "header__popup_show" : "header__popup_close"}`}>
				<nav className="header__popup-navigate">
					<button className="header__close-button" onClick={ handleMenuClose }></button>
					<div className={props.isLoggedIn ? 'header__hideden-nav_type_authorization' :'header__hideden-nav_type_disable'}>
						<Link to="/" className={`header__hidden-nav_link ${location.pathname === "/" ? "header__hidden-nav_link_current" : ''}`}>Главная</Link>
						<Link to="/movies" className={`header__hidden-nav_link ${location.pathname === "/movies" ? "header__hidden-nav_link_current" : ''}`}>Фильмы</Link>
						<Link to="/saved-movies" className={`header__hidden-nav_link ${location.pathname === "/saved-movies" ? "header__hidden-nav_link_current" : ''}`}>Сохранённые фильмы</Link>
					</div>
					<Link to="/profile">
							<button className='header__nav_button header__hidden-nav_button_account'>Аккаунт</button>
					</Link>
				</nav>
			</div>
		</div>

		<div className='header__open-nav'>
			<nav className={props.isLoggedIn ? 'header__nav_type_disable' :'header__nav_type_authorization'}>
				<Link to="/signup" className='header__nav_link header__nav_link_sign-up '>Регистрация</Link>
				<Link to="/signin">
					<button className='header__nav_button header__nav_button_sign-in '>Войти</button>
				</Link>
			</nav>
			<nav className={props.isLoggedIn ? 'header__nav_type_isloggedin' :'header__nav_type_disable'}>
				<div className='header__movies-nav'>
					<Link to="/movies" className='header__nav_link header__nav_link_movies '>Фильмы</Link>
					<Link to="/saved-movies" className='header__nav_link header__nav_link_movies '>Сохранённые фильмы</Link>
				</div>
				<Link to="/profile">
					<button className='header__nav_button header__nav_button_account '>Аккаунт</button>
				</Link>
			</nav>
		</div>
  </header>
  )
}

export default Header;