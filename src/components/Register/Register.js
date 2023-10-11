import "./Register.css";
import React, { useEffect, useState } from "react";
import logo from "../../images/logo.svg";
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('12345678')
  useEffect(() => {
    setName('Даниил');
    setEmail('b1izznec@ynadex.ru');
  }, [])

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <section className="register">
      <img className="register__logo" src={logo} alt="Логотип"/>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form">
        <label className="register__label">
          <p className="register__placeholder">Имя</p>
          <input className="register__input" type="text" name="name" minLength="2" maxLength="40" value={ name || "" } onChange={handleChangeName} required placeholder="Имя"></input>
        </label>
        <label className="register__label">
          <p className="register__placeholder">E-mail</p>
          <input className="register__input" type="text" name="email" minLength="2" maxLength="40" value={ email || "" } onChange={handleChangeEmail} required placeholder="E-mail"></input>
        </label>
        <label className="register__label">
          <p className="register__placeholder">Пароль</p>
          <input className="register__input register__input_pass" type="password" name="password" minLength="8" maxLength="16" value={ password || "" } onChange={handleChangePassword} autoComplete="off" required ></input>
          <span className="register__input-error register__input-error_pass">Что-то пошло не так...</span>
        </label>
        <button className="register__button">Зарегистрироваться</button>
        <div className="register__link-block">
          <p className="register__name-link">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__link">Войти</Link>
        </div>
      </form>
    </section>
  )
}

export default Register;