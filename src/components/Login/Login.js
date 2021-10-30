import PageWithForm from "../PageWithForm/PageWithForm";
import '../Form/Form.css';

function Login({clickLogin}) {

    return (
      <div>
        <PageWithForm
          title='Рады видеть!'
          name='login'
          buttonText='Войти'
          linkAbout='Ещё не зарегистрированы?'
          linkText='Регистрация'
          link='signup'
          clickLogin={clickLogin}
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
              тут что-то про ошибку емэйла
            </span>
            <label className='form__label'>
                E-mail
            </label>
            <input
              className='form__input'
              type='password'
              name='password'
              id='user-password'
              placeholder='Введите пароль'
              required
            />
            <span className='form__error' id='user-password-error'>
              тут что-то про ошибку пароля
            </span>
        </PageWithForm>
      </div>
    );
  }
  
  export default Login;