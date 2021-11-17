import React, { useEffect } from "react";
import PageWithForm from "../PageWithForm/PageWithForm";
import "../Form/Form.css";
import { useFormWithValidation } from "../../hooks/useForm";

function Register({ 
  onRegister, isSending, errStatus, resetErrorStatus // прокинуть объект для авторизации в App
}) {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation(); // траблы со стэйтами хука при автозаполнении форм

  useEffect(() => {
    resetForm({});
  }, [isSending, resetForm]);
  useEffect(() => {
    resetErrorStatus();
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    onRegister(values);
  }
  return (
    <div>
      <PageWithForm
        title="Добро пожаловать!"
        name="register"
        buttonText="Зарегистрироваться"
        linkAbout="Уже зарегистрированы?"
        linkText="Войти"
        link="signin"
        onSubmit={handleSubmit}
        isSending={isSending}
        isValid={isValid}
        errStatus={errStatus}
      >
        <label className="form__label">Имя</label>
        <input
          className="form__input"
          type="text"
          name="name"
          id="user-name"
          placeholder="Введите имя"
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          autoComplete="off"
          required
        />
        <span className="form__error" id="user-name-error">
          {errors.name || ""}
        </span>
        <label className="form__label">E-mail</label>
        <input
          className="form__input"
          type="email"
          name="email"
          id="user-email"
          placeholder="Введите E-mail"
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <span className="form__error" id="user-email-error">
          {errors.email || ""}
        </span>
        <label className="form__label">Пароль</label>
        <input
          //добавить проверку длины ссообщения ошибки
          className={`form__input ${!!errors.password && "form__input_error"}`}
          type="password"
          name="password"
          id="user-password"
          placeholder="Введите пароль"
          onChange={handleChange}
          minLength="8"
          maxLength="40"
          autoComplete="off"
          required
        />
        <span className="form__error" id="user-password-error">
         {errors.password || ""}
        </span>
      </PageWithForm>
    </div>
  );
}

export default Register;
