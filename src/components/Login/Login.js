import "./Login.css";
import React, { useContext, useEffect, useState } from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../utils/hooks/useForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Login({ onLogin }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const { isError } = useContext(CurrentUserContext);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(false);
  }, [values]);

  function handleOnSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    const { email, password } = values;
    if (!isValid) {
      return;
    }
    onLogin({ email, password });
  }
  return (
    <section className="login">
      <Link to="/" className="login__wrapper-logo">
        <img src={logo} className="login__logo" alt="Логотип" />
      </Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form" onSubmit={handleOnSubmit}>
        <label className="login__label">
          <p className="login__placeholder">E-mail</p>
          <input
            className="login__input"
            type="email"
            name="email"
            minLength="2"
            maxLength="40"
            pattern="^\S+@\S+\.\S+$"
            value={values.email || ""}
            onChange={handleChange}
            required
            placeholder="E-mail"
          />
          <span className="login__input-error">{errors.email || ""}</span>
        </label>
        <label className="login__label">
          <p className="login__placeholder">Пароль</p>
          <input
            className="login__input login__input_pass"
            type="password"
            name="password"
            minLength="8"
            maxLength="16"
            value={values.password || ""}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <span className="login__input-error login__input-error_pass">
            {errors.password || ""}
          </span>
        </label>
        {isError.login && (
          <span className="login__input-error login__input-error_pass">
            {isError.login === 401
              ? "Вы ввели неправильный логин или пароль."
              : "При авторизации произошла ошибка."}
          </span>
        )}
        <button className="login__button" type="submit" disabled={disabled || !isValid}>
          Войти
        </button>
        <div className="login__link-block">
          <p className="login__name-link">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="login__link">
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;
