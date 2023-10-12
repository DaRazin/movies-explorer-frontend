import "./Login.css";
import React, { useEffect, useState } from "react";
import logo from "../../images/logo.svg";
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('12345678')
  useEffect(() => {
    setEmail('b1izznec@ynadex.ru');
  }, [])

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  return (
    <section className="login">
      <Link to="/">
        <img src={ logo } className="header__logo" alt="Логотип" />
      </Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form">
        <label className="login__label">
          <p className="login__placeholder">E-mail</p>
          <input className="login__input" type="text" name="email" minLength="2" maxLength="40" value={ email || "" } onChange={handleChangeEmail} required placeholder="E-mail"></input>
        </label>
        <label className="login__label">
          <p className="login__placeholder">Пароль</p>
          <input className="login__input login__input_pass" type="password" name="password" minLength="8" maxLength="16" value={ password || "" } onChange={handleChangePassword} autoComplete="off" required ></input>
          <span className="login__input-error login__input-error_pass">Что-то пошло не так...</span>
        </label>
        <button className="login__button">Войти</button>
        <div className="login__link-block">
          <p className="login__name-link">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="login__link">Регистрация</Link>
        </div>
      </form>
    </section>
  )
}

export default Login;