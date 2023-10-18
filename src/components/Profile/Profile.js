import "./Profile.css";
import Header from "../Header/Header";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/hooks/useForm";
import { Link } from "react-router-dom";

function Profile({ onUpdateInfoUser, onSignOut }) {
  const { user, isLoggedIn, isError } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const [isOneCange, setIsOneCange] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  function handleIsOneCange(e) {
    setIsOneCange(true);
  }

  function handleIsSave(e) {
    setIsOneCange(false);
  }

  useEffect(() => {
    if (user?.name) {
      resetForm({ name: user.name, email: user.email });
    }
  }, [user]);

  useEffect(() => {
    if (isError.updateUser === 400) {
      resetForm({ name: user.name, email: user.email });
    }
  }, [isError.updateUser, user]);

  useEffect(() => {
    setIsChanged(user.name !== values.name || user.email !== values.email);
  }, [values, user]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsChanged(false);
    handleIsSave();
    onUpdateInfoUser({
      name: values.name,
      email: values.email,
    });
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className="profile">
        <h1 className="profile__title">Привет, {user.name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__input-block">
            <input
              className="profile__input"
              name="name"
              type="text"
              placeholder="Имя"
              value={values.name || ""}
              onChange={handleChange}
              minLength={2}
              maxLength={30}
              disabled={!isOneCange}
              required
            />
            <span className="login__input-error">{errors.name || ""}</span>
          </div>
          <div className="profile__input-block">
            <input
              className="profile__input"
              type="email"
              name="email"
              value={values.email || ""}
              pattern="^\S+@\S+\.\S+$"
              onChange={handleChange}
              required
              placeholder="E-mail"
              disabled={!isOneCange}
            />
            <span className="login__input-error">{errors.email || ""}</span>
            {isError.updateUser && (
              <span className="login__input-error">
                {isError.updateUser === 400
                  ? "При обновлении профиля произошла ошибка"
                  : "Пользователь с таким email уже сществует"}
              </span>
            )}
          </div>
          {!isOneCange ? (
            <>
              <button
                className="profile__button profile__button_edit"
                onClick={handleIsOneCange}
                type="button"
              >
                Редактировать
              </button>
              <Link
                to="/"
                onClick={onSignOut}
                className="profile__button profile__button_logout"
              >
                Выйти из аккаунта
              </Link>
            </>
          ) : (
            <button
              type="submit"
              className="profile__button_save"
              disabled={!(isChanged && isValid)}
            >
              Сохранить
            </button>
          )}
        </form>
      </section>
    </>
  );
}

export default Profile;
