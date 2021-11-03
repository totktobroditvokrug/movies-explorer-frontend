import React from 'react';
import PageWithForm from "../PageWithForm/PageWithForm";
import "../Form/Form.css";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value)
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value)
  }

  function handleSubmit(evt){
    evt.preventDefault();
    onLogin({ email, password });
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
      >
        <label className="form__label">E-mail</label>
        <input
          className="form__input"
          type="url"
          name="email"
          id="user-email"
          placeholder="Введите E-mail"
          onChange={handleEmailChange}
          required
        />
        <span className="form__error" id="user-email-error">
          тут что-то про ошибку емэйла
        </span>
        <label className="form__label">E-mail</label>
        <input
          className="form__input"
          type="password"
          name="password"
          id="user-password"
          placeholder="Введите пароль"
          onChange={handlePasswordChange}
          required
        />
        <span className="form__error" id="user-password-error">
          тут что-то про ошибку пароля
        </span>
      </PageWithForm>
    </div>
  );
}

export default Login;
