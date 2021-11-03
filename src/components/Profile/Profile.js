import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";
import "../Form/Form.css";


function Profile({ clickExit, onUpdateProfile }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value)
  }

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  function handleSubmit(evt){
    evt.preventDefault();
    onUpdateProfile({ email, name });
  }
  return (
    <form className="body profile">
      <h1 className="form__title profile__title">Привет, {currentUser.data.name}!</h1>
      <div className="profile__form">
        <p className="profile__field">Имя</p>
        <input
          className="profile__input"
          type="text"
          name="name"
          id="user-name"
          placeholder="Введите новое имя"
          onChange={handleNameChange}
          required
        />
      </div>
      <span
        className="form__error form__error_underline"
        id="user-name-error"
      ></span>
      <div className="profile__form">
        <p className="profile__field">E-mail</p>
        <input
          className="profile__input"
          type="url"
          name="email"
          id="user-email"
          placeholder="Введите новый e-mail"
          onChange={handleEmailChange}
          required
        />
      </div>
      <span className="form__error" id="user-email-error">
        {"Какая-то ошибка с email"}
      </span>
      <button type="submit" className="profile__edit" onClick={handleSubmit}>Редактировать</button>
      <Link className="profile__exit" onClick={clickExit} to="/">
        Выйти из аккаунта
      </Link>
    </form>
  );
}

export default Profile;
