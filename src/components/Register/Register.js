import React from 'react';
// import {useFormWithValidation} from "../hooks/useForm";
import PageWithForm from "../PageWithForm/PageWithForm";
import "../Form/Form.css";

function Register({
  onRegister // прокинуть объект для авторизации в App
}) {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

  function handleNameChange(event) {
    setName(event.target.value)
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }
  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  function handleSubmit(event){
    console.log('поля ввода:', name, email, password);
    event.preventDefault();
    onRegister({ name, email, password });
  }
  return (
    <div>
      <PageWithForm
        title="Добро пожаловать!"
        name="register"
        buttonText="Зарегистрироваться"
        linkAbout="Уже зарегистрированы?"
        linkText="Зарегистрироваться"
        link="signin"
        onSubmit={handleSubmit}
      >
        <label className="form__label">Имя</label>
        <input
          className="form__input"
          type="text"
          name="name"
          id="user-name"
          placeholder="Введите имя"
          onChange={handleNameChange}
          required
        />
        <span className="form__error" id="user-name-error">
          тут что-то про ошибку имени
        </span>
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
          //добавить проверку длины ссообщения ошибки
          className="form__input form__input_error"
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

export default Register;
