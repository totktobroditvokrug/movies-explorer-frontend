import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import "../Form/Form.css";

const userName = "Сергей";

function Profile({ email, clickExit }) {

  return (
    <form className="body profile">
      <h1 className="form__title profile__title">Привет, {userName}!</h1>
      <div className="profile__form">
        <p className="profile__field">Имя</p>
        <input
          className="profile__input"
          type="text"
          name="name"
          id="user-name"
          value={userName}
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
          value={email}
        />
      </div>
      <span className="form__error" id="user-email-error">
        {"Какая-то ошибка с email"}
      </span>
      <p className="profile__edit">Редактировать</p>
      <Link className="profile__exit" onClick={clickExit} to="/">
        Выйти из аккаунта
      </Link>
    </form>
  );
}

export default Profile;
