import React from 'react';
import { Link } from 'react-router-dom';

function Register(
//     {
//     registerData // прокинуть объект для авторизации в App
// }
) {

//   const [password, setPassword] = React.useState('');
//   const [email, setEmail] = React.useState('');

//   function handlePasswordChange(event) {
//     setPassword(event.target.value)
//   }
//   function handleEmailChange(event) {
//     setEmail(event.target.value)
//   }

//   function handleSubmit(event){
//     event.preventDefault();
//     registerData({ email, password });
//  }

  return (
    
      <form className="log-in" onSubmit={handleSubmit}>
        <h2 className="log-in__title">Регистрация</h2>
        <label className="log-in__wrapp-input">
          <input className="log-in__input" type="email" name="email" id="email"  placeholder="введите e-mail" required
            onChange={handleEmailChange} 
          />
        </label>
        <label className="log-in__wrapp-input">
          <input className="log-in__input" type="password" name="password" id="password"  placeholder="пароль не менее 8 символов" required
            onChange={handlePasswordChange} 
          />
        </label>
        <button className="log-in__button" type="submit">Зарегистрироваться</button>
        <Link className="log-in__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
      </form>

  )
}

export default Register;