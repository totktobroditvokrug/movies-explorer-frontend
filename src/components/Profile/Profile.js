import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";
import "../Form/Form.css";
import "../PageWithForm/PageWithForm.css";
// import { useFormWithValidation } from "../../hooks/useForm";

function Profile({
  clickExit,
  onUpdateProfile,
  isSending,
  isEditProfileMode, // режим редактирование профиля
  onEditProfileMode, // стэйт включения редактирования
  offEditProfileMode, // стэйт выключения редактирования
  errStatus,
  resetErrorStatus
}) {

  const currentUser = React.useContext(CurrentUserContext);
  const [isName, setName] = React.useState(currentUser.data.name);
  const [isErrorName, setErrorName] = React.useState('');
  const [isValid, setValid] = React.useState(true);
  const [isNameIdentical, setNameIdentical] = React.useState(true);
  const [isEmailIdentical, setEmailIdentical] = React.useState(true);
  const [isEmail, setEmail] = React.useState(currentUser.data.email);
  const [isErrorEmail, setErrorEmail] = React.useState('');
  useEffect(() => {  // при повторных заходах на страницу скидывать режим редактирования
    offEditProfileMode();
        resetErrorStatus();
  }, []);
  useEffect(() => {  // при повторных заходах на страницу скидывать режим редактирования
    setEmail(currentUser.data.email);
    setName(currentUser.data.name);
  }, [isEditProfileMode]);
  const handleChangeName = (evt) => {
//    console.log('Validation-> меняем имя:', evt.target.value);
    setName(evt.target.value);
    setErrorName(evt.target.validationMessage);
    setValid(evt.target.closest("form").checkValidity());
//    console.log('валидность name=', evt.target.closest("form").checkValidity());
    if (evt.target.value !== currentUser.data.name)
    {
//      console.log('поле name с новым значением');
      setNameIdentical(false);
    } 
    else {
//      console.log('поле name со старым значением');
      setNameIdentical(true);
    }
  };

  const handleChangeEmail = (evt) => {
//    console.log('Validation-> меняем почту:', evt.target.value);
    setEmail(evt.target.value);
    setErrorEmail(evt.target.validationMessage);
    setValid(evt.target.closest("form").checkValidity());
//    console.log('валидность email=', evt.target.closest("form").checkValidity());
    if (evt.target.value !== currentUser.data.email)
    {
//      console.log('поле email с новым значением');
      setEmailIdentical(false);
    } 
    else {
//      console.log('поле email со старым значением');
      setEmailIdentical(true);
    }
  };

  // const { values, handleChange, resetForm, errors, isValid } =
  //   useFormWithValidation();

  // useEffect(() => {
  //   resetForm({});
  // }, [isSending, resetForm]);


  function handleSubmit(e) {
 //   // console.log('сабмит профиля', values);
    e.preventDefault();
    onUpdateProfile({name: isName, email: isEmail});
  }

  // const handleOverlayClose = (event) => {
  //   if (event.target === event.currentTarget) {
  //     offEditProfileMode();
  //     resetForm({});
  //   }
  // }

  return (
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
              onChange={handleChangeName}
              required
              minLength="2"
              maxLength="30"
              value={isName}
            />
          ) : (
            <p className="profile__input">{currentUser.data.name}</p>
          )}
        </div>
        <span
          className="form__error form__error_underline"
          id="user-name-error"
        >
          {isErrorName || ""}
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
              onChange={handleChangeEmail}
              required
              value={isEmail}
            />
          ) : (
            <p className="profile__input">{currentUser.data.email}</p>
          )}
        </div>
        <span className="form__error" id="user-email-error">
          {isErrorEmail || ""}
        </span>
        { !!errStatus && errStatus!=='' && <p className="form__error form__error_server">{errStatus}</p>}
        {isEditProfileMode ? (
          <button
            type="submit"
            className={`page__button ${
              (!isValid || isSending || (isNameIdentical && isEmailIdentical)) && "page__button_disabled"
            }`}
            onClick={handleSubmit}
            disabled={isSending || !isValid || (isNameIdentical && isEmailIdentical)}
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
  );
}

export default Profile;
