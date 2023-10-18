import "./Register.css";
import React, { useContext, useEffect, useState } from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../utils/hooks/useForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Register({ onRegister }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const { isError } = useContext(CurrentUserContext);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(false);
  }, [values]);

  function handleOnSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    const { name, email, password } = values;
    if (!isValid) {
      return;
    }
    onRegister({ name, email, password });
  }

  return (
    <section className="register">
      <Link to="/" className="register__wrapper-logo">
        <img src={logo} className="register__logo" alt="Логотип" />
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form" onSubmit={handleOnSubmit}>
        <label className="register__label" on>
          <p className="register__placeholder">Имя</p>
          <input
            className="register__input"
            type="text"
            name="name"
            minLength="2"
            maxLength="30"
            value={values.name || ""}
            onChange={handleChange}
            required
            placeholder="Имя"
          />
          <span className="register__input-error">{errors.name || ""}</span>
        </label>
        <label className="register__label">
          <p className="register__placeholder">E-mail</p>
          <input
            className="register__input"
            type="email"
            name="email"
            minLength="2"
            maxLength="30"
            pattern="^\S+@\S+\.\S+$"
            value={values.email || ""}
            onChange={handleChange}
            required
            placeholder="E-mail"
          />
          <span className="register__input-error">{errors.email || ""}</span>
        </label>
        <label className="register__label">
          <p className="register__placeholder">Пароль</p>
          <input
            className="register__input register__input_pass"
            type="password"
            name="password"
            minLength="8"
            maxLength="16"
            value={values.password || ""}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <span className="register__input-error register__input-error_pass">
            {errors.password || ""}
          </span>
        </label>
        {isError.register && (
          <span className="register__input-error register__input-error_pass">
            {isError.register === 409
              ? "Пользователь с таким email уже сущетсвует"
              : "При регистрации пользователя произошла ошибка"}
          </span>
        )}
        <button
          className="register__button"
          type="submit"
          disabled={!isValid || isError.register || disabled}
        >
          Зарегистрироваться
        </button>
        <div className="register__link-block">
          <p className="register__name-link">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;
