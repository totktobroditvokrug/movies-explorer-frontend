import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { Route, Switch, useHistory } from "react-router-dom";

import "./App.css";
import Movies from "../Movies/Movies";

import * as auth from '../../utils/auth';
import { api } from "../../utils/api.js";

function App() {
  const [isRegistered, setRegistered] = useState(false);

  //---------- состояния и обработчики пользователя
const [currentUser, setCurrentUser] = React.useState({data:{}});
const [loggedIn, setLoggedIn] = React.useState(false);  // При авторизации будем перезаписывать юзера и переполучать токен

useEffect(() => {
   console.log('loggedIn:', loggedIn);
  if (loggedIn) {
    // console.log('запрос к апи за данными пользователя token=', localStorage.getItem('jwt'));
    api
      .getUserInfo() // запрос к апи за данными пользователя
      .then((data) => {
        console.log('данные пользователя от getUserInfo:', data);
        setCurrentUser(data);
      })
      .catch((err) => {
        // console.log('ошибка получения данных пользователя', err);
      });
  }
}, [loggedIn]);

  //---------- состояния и обработчики форм авторизации
  const [authUser, setAuthUser] = React.useState({
    name: "Сергей",
    email: "kto-to-5@gde.to",
    idAuthUser: "1234567",
  }); // данные юзера при регистрации

  const [statusTooltip, setStatusTooltip] = React.useState({
    srcIcon: "",
    text: "",
    isOpen: false,
  }); // статус успешной регистрации. Текст и ссылка картинки

  // // console.log('!!statusTooltip:', !!statusTooltip);

  const [email, setEmail] = React.useState("test email");

  const history = useHistory();

  function onLogin({ email, password }) {
    // авторизация
    auth
      .login({ email, password })
      .then((res) => {
        const token = res.token;
        console.log('авторизация. токен от сервера такой:', token);
        if (!!token) {
          // если токен от сервера пришел
          localStorage.setItem("jwt", token);
          setLoggedIn(true); // разрешаем вход на защищаемый роут <----------
          setEmail(email);
          history.push("/"); // добавить флаг для смены меню хедера
        } else {
            // вешаем окошко ошибки авторизации
            console.log('Токен от сервера не пришел');
        }
      })
      .catch((err) => {
          // вешаем окошко проблем
          console.log('Ошибка автороизации:', err);
      });
  }

  // ---------------- Регистрация отлажена без валидации -----------------!!!
  function onRegister({ name, email, password }) {
    auth
      .register({ name, email, password })
      .then((res) => {
        console.log('Регистрация успешна-', res);
        history.push("/signin"); // на авторизацию
        setAuthUser({
          name: res.data.name,
          email: res.data.email,
          idAuthUser: res.data._id,
        });
      })
      .catch((err) => {
         console.log('Регистрация с ошибкой-', err);
      });
  }

  function onExit() {
    setLoggedIn(false); // разобраться, почему App загружается дважды и сам скидывает логин
    localStorage.removeItem("jwt"); // убиваем токен
    history.push("/signin"); // заново на авторизацию
    // console.log('убили токен, ушли на регистрацию, loggedIn=', loggedIn);
  }

  //------------- работа с токеном  ----------------
  useEffect(() => {
    if (!loggedIn) {
      tokenCheck();
    }
  }, [loggedIn]); //  Ругается на зависимость

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // если токен есть, проверим его
      // console.log('токен:', jwt);
      auth
        .checkToken(jwt)
        .then((res) => {
          // console.log('при получении токена', res);
          if (res.data.email) {
            // если в ответе есть емэйл, считаем токен живым
            setLoggedIn(true); // разрешаем вход на защищаемый роут <----------
            setEmail(res.data.email);
            history.push("/");
          } else {
            setLoggedIn(false); // запрет на вход
            // console.log('проблемы с токеном:');
            history.push("/signin");
          }
        })
        .catch((err) => {
          // console.log('ошибка проверки токена:', err);
          setLoggedIn(false); // запрет на вход
          history.push("/signin"); // на повторную авторизацию
        });
    }
  };

  function clickLogin() {
    setRegistered(true);
  }
  function clickExit() {
    onExit();
    console.log("выйти из аккаунта", isRegistered);
    setRegistered(false);
  }
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Header email={email} loggedIn={loggedIn} />
          <Main></Main>
          <Footer />
        </Route>
        <Route path="/not-registered">
          <Header email={email} />
          <Main></Main>
          <Footer />
        </Route>
        <Route path="/movies">
          <Header email={email} />
          <Movies name="movies" />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header email={email} />
          <Movies name="saved-movies" />
          <Footer />
        </Route>
        <Route path="/signup">
          <Register  onRegister={onRegister}/>
        </Route>
        <Route path="/signin">
          <Login onLogin={onLogin} />
        </Route>
        <Route path="/profile">
          <Header email={email} />
          <Profile email={email} clickExit={clickExit}></Profile>
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
