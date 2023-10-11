import "./Profile.css";
import Header from "../Header/Header"


function Profile(props) {
  return (
    <>
      <Header 
				isLoggedIn = { props.isLoggedIn }
			/>
      <section className="profile">
        <h1 className="profile__title">Привет, Даниил!</h1>
        <form className="profile__form">
          <div className="profile__input-block">
            <input className="profile__input" name="userName" type="text" placeholder="Имя" />
            <p className="profile__text-content">Даниил</p>
          </div>
          <div className="profile__input-block">
            <input className="profile__input" name="userName" type="text" placeholder="E-mail" />
            <p className="profile__text-content">b1izznec@yandex.ru</p>
          </div>
          <button className="profile__button profile__button_edit" type="button">Редактировать</button>
          <button className="profile__button profile__button_logout" type="button">Выйти из аккаунта</button>
        </form>
      </section>
    </>
  )
}

export default Profile;