import React, { useEffect } from 'react';
import PageWithForm from "../PageWithForm/PageWithForm";
import "../Form/Form.css";
import { useFormWithValidation } from "../../hooks/useForm";

function Login({ onLogin, isSending }) {
  const { values, handleChange, resetForm, errors, isValid } =
  useFormWithValidation();

useEffect(() => {
  resetForm({});
}, [isSending, resetForm]);


  function handleSubmit(evt){
    evt.preventDefault();
    onLogin(values);
  }
  return (
    <div>
      <PageWithForm
        title="Рады видеть!"
        name="login"
        buttonText="Войти"
        linkAbout="Ещё не зарегистрированы?"
        linkText="Регистрация"
        link="signup"
        onSubmit={handleSubmit}
        isSending={isSending}
        isValid={isValid}
      >
        <label className="form__label">E-mail</label>
        <input
          className="form__input"
          type="email"
          name="email"
          id="user-email"
          placeholder="Введите E-mail"
          onChange={handleChange}
          required
        />
        <span className="form__error" id="user-email-error">
          {errors.email || ""}
        </span>
        <label className="form__label">Пароль</label>
        <input
          className="form__input"
          type="password"
          name="password"
          id="user-password"
          placeholder="Введите пароль"
          onChange={handleChange}
          minLength="8"
          maxLength="40"
          required
        />
        <span className="form__error" id="user-password-error">
          {errors.password || ""}
        </span>
      </PageWithForm>
    </div>
  );
}

export default Login;
