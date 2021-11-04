import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import * as auth from "../../utils/auth";
import { api } from "../../utils/api.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";

function App() {
  const [isRegistered, setRegistered] = useState(false);

  //---------- состояния и обработчики пользователя
  const [currentUser, setCurrentUser] = React.useState({ data: {} });
  const [loggedIn, setLoggedIn] = React.useState(false); // При авторизации будем перезаписывать юзера и переполучать токен

  useEffect(() => {
    console.log("loggedIn:", loggedIn);
    if (loggedIn) {
      // console.log('запрос к апи за данными пользователя token=', localStorage.getItem('jwt'));
      api
        .getUserInfo() // запрос к апи за данными пользователя
        .then((data) => {
          console.log("данные пользователя от getUserInfo:", data);
          setCurrentUser(data);
        })
        .catch((err) => {
          // console.log('ошибка получения данных пользователя', err);
        });
    }
  }, [loggedIn]);

  const [email, setEmail] = React.useState("test email");

  const history = useHistory();

  // -------------------- авторизация отлажена без ошибки сервера ----------------!!!
  const [isLoginSending, setLoginSending] = React.useState(false); // ожидание ответа сервера
  function onLogin({ email, password }) {
    setLoginSending(true);
    auth
      .login({ email, password })
      .then((res) => {
        const token = res.token;
        console.log("авторизация. токен от сервера такой:", token);
        if (!!token) {
          // если токен от сервера пришел
          localStorage.setItem("jwt", token);
          setLoggedIn(true); // разрешаем вход на защищаемый роут <----------
          setEmail(email);
          history.push("/movies"); // добавить флаг для смены меню хедера
        } else {
          // вешаем окошко ошибки авторизации
          console.log("Токен от сервера не пришел");
        }
      })
      .catch((err) => {
        // вешаем окошко проблем
        console.log("Ошибка автороизации:", err);
      })
      .finally(() => setLoginSending(false));
  }

  // ---------------- Регистрация отлажена без ошибки сервера -----------------!!!
  const [isRegisterSending, setRegisterSending] = React.useState(false); // ожидание ответа сервера
  function onRegister({ name, email, password }) {
    setRegisterSending(true);
    auth
      .register({ name, email, password })
      .then((res) => {
        console.log("Регистрация успешна-", res);
        console.log("отправить на авторизацию", password, email);
        onLogin({ email, password }); // здесь возможна подстава, что будет не тот пароль и почта
      })
      .catch((err) => {
        console.log("Регистрация с ошибкой-", err);
      })
      .finally(() => setRegisterSending(false));
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

  //------------------- Обновление профиля отлажено без ошибки сервера --------------- !!!
  const [isEditProfileMode, setEditProfileMode] = React.useState(true); // включить режим редактирования
  const [isProfileSending, setProfileSending] = React.useState(false); // ожидание ответа сервера
  function onEditProfileMode() {
    setEditProfileMode(true);
  }
  function offEditProfileMode() {
    setEditProfileMode(false);
  }
  function onUpdateProfile({ email, name }) {
    setProfileSending(true);
    //    console.log('Запрос patch на изменение профиля', email, name);
    api
      .setUserInfo({ name, email })
      .then((newUserData) => {
        console.log("Профиль обновлен-", newUserData);
        //    history.push("/"); // на главную
        setCurrentUser(newUserData);
        setEmail(email);
      })
      .catch((err) => {
        console.log("Ошибка обновления профиля-", err);
      })
      .finally(() => {
        setProfileSending(false);
        setEditProfileMode(false);
      }); // сервер отстрелялся
  }

  function clickExit() {
    onExit();
    console.log("выйти из аккаунта", isRegistered);
    setRegistered(false);
  }

  //------------------ Разметка ---------------
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Switch>
          <Route exact path="/">
            <Header email={email} loggedIn={loggedIn} />
            <Main></Main>
            <Footer />
          </Route>
          <ProtectedRoute path="/movies" loggedIn={loggedIn}>
            <Route path="/movies">
              <Header email={email} />
              <Movies name="movies" />
              <Footer />
            </Route>
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <Route path="/saved-movies">
              <Header email={email} />
              <Movies name="saved-movies" />
              <Footer />
            </Route>
          </ProtectedRoute>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Route path="/profile">
              <Header email={email} />
              <Profile
                clickExit={clickExit}
                onUpdateProfile={onUpdateProfile}
                isSending={isProfileSending}
                isEditProfileMode={isEditProfileMode}
                onEditProfileMode={onEditProfileMode}
                offEditProfileMode={offEditProfileMode}
              ></Profile>
            </Route>
          </ProtectedRoute>
          <Route path="/signup">
            <Register onRegister={onRegister} isSending={isRegisterSending} />
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin} isSending={isLoginSending} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
