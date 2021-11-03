import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";
import "../Form/Form.css";
import "../PageWithForm/PageWithForm.css";
import { useFormWithValidation } from "../../hooks/useForm";

function Profile({
  clickExit,
  onUpdateProfile,
  isSending,
  isEditProfileMode,
  onEditProfileMode,
  offEditProfileMode,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  useEffect(() => {
    resetForm({});
  }, [isSending, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateProfile(values);
  }

  // const [email, setEmail] = React.useState("");
  // const [name, setName] = React.useState("");

  // function handleEmailChange(evt) {
  //   setEmail(evt.target.value);
  // }

  // function handleNameChange(evt) {
  //   setName(evt.target.value);
  // }

  // function handleSubmit(evt) {
  //   evt.preventDefault();
  //   onUpdateProfile({ email, name });
  // }
  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget) {
      offEditProfileMode();
    }
  }
//  function handleOverlayClose() {
  //   console.log("кликаем мышкой");
  // }

  return (
    <div className="" style={{height: '90vh'}} onMouseDown={handleOverlayClose}>
      <form className="body profile" noValidate >
        <h1 className="form__title profile__title">
          Привет, {currentUser.data.name}!
        </h1>
        <div className="profile__form">
          <p className="profile__field">Имя</p>
          {isEditProfileMode ? (
            <input
              className="profile__input"
              type="text"
              name="name"
              id="user-name"
              placeholder="Введите новое имя"
              onChange={handleChange}
              required
              minLength="2"
              maxLength="40"
            />
          ) : (
            <p className="profile__input">{currentUser.data.name}</p>
          )}
        </div>
        <span
          className="form__error form__error_underline"
          id="user-name-error"
        >
          {errors.name || ""}
        </span>
        <div className="profile__form">
          <p className="profile__field">E-mail</p>
          {isEditProfileMode ? (
            <input
              className="profile__input"
              type="email"
              name="email"
              id="user-email"
              placeholder="Введите новый e-mail"
              onChange={handleChange}
              required
            />
          ) : (
            <p className="profile__input">{currentUser.data.email}</p>
          )}
        </div>
        <span className="form__error" id="user-email-error">
          {errors.email || ""}
        </span>
        {isEditProfileMode ? (
          <button
            type="submit"
            className={`page__button ${
              (!isValid || isSending) && "page__button_disabled"
            }`}
            onClick={handleSubmit}
            disabled={isSending || !isValid}
          >
            {isSending ? "Сохраняем..." : "Сохранить"}
          </button>
        ) : (
          <p className="profile__edit" onClick={onEditProfileMode}>
            Редактировать
          </p>
        )}
        {!isEditProfileMode && (
          <Link className="profile__exit" onClick={clickExit} to="/">
            Выйти из аккаунта
          </Link>
        )}
      </form>
    </div>
  );
}

export default Profile;
