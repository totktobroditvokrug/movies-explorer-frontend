import PageWithForm from "../PageWithForm/PageWithForm";
import "../Form/Form.css";

function Register() {
  return (
    <div>
      <PageWithForm
        title="Добро пожаловать!"
        name="register"
        buttonText="Зарегистрироваться"
        linkAbout="Уже зарегистрированы?"
        linkText="Войти"
        link="signin"
      >
        <label className="form__label">Имя</label>
        <input
          className="form__input"
          type="text"
          name="name"
          id="user-name"
          placeholder="Введите имя"
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
