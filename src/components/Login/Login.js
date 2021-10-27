import PageWithForm from "../PageWithForm/PageWithForm";
import '../Form/Form.css';

function Login({}) {

    return (
      <PageWithForm
        title='Рады видеть!'
        name='login'
        buttonText='Войти'
        linkAbout='Ещё не зарегистрированы?'
        linkText='Регистрация'
        buttonText={"Сохранить"}
      >
        <label className='form__label'>
            E-mail
        </label>
          <input
            className='form__input'
            type='url'
            name='email'
            id='user-email'
            placeholder='Введите E-mail'
            required
          />
          <span className='form__error' id='user-email-error'>
          </span>
      </PageWithForm>
    );
  }
  
  export default Login;