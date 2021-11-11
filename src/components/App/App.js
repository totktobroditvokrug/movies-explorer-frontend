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
import { moviesApi } from "../../utils/MoviesApi"; // внешний апи с фильмами
import { mainApi } from "../../utils/MainApi"; // апи для пользователя
import { chekErrorType } from "../../utils/err_const";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { ADD_NARROW, ADD_WIDE, WIDTH_NARROW } from "../../utils/constants";
import { cardImageUrl } from "../../utils/constants";

import "./App.css";

function App() {
  const [isRegistered, setRegistered] = useState(false);

  //---------------- Все загруженные карточки фильмов -------------
  const [isDownloadedMovies, setDownloadedMovies] = React.useState([]); // внешний список фильмов
  const [isMainMovies, setMainMovies] = React.useState([]); // сптсок фильмов на внутреннем сервере

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

      //--------------- Работа с фильмами ---------------
      console.log("Запрос фильмов");
      moviesApi // запрос всех фильмов с внешнего апи
        .getInitialCards()
        .then((data) => {
          console.log("ответ внешнего сервера:", data);
          setDownloadedMovies(data);
          console.log("Данные пришли:", isDownloadedMovies); // выполняется до загрузки массива
        })
        .catch((err) => {
          console.log("данные не пришли:", err);
        });

      mainApi // запрос всех фильмов всех пользователей со своего апи! Переделать сервер
        .getInitialCards()
        .then((data) => {
          console.log("фильмы на своем сервере:", data);
          setMainMovies(data);
          console.log("Данные пришли:", isMainMovies); // выполняется до загрузки массива
        })
        .catch((err) => {
          console.log("данные не пришли:", err);
        });
    }
  }, [loggedIn]);

  const [email, setEmail] = React.useState("test email");

  const history = useHistory();

  // -------------------- авторизация отлажена  ---------------- проверить статусы сервера!!!
  const [isLoginSending, setLoginSending] = React.useState(false); // ожидание ответа сервера
  const [isLoginRec, setLoginRec] = React.useState(""); // сообщение сервера
  function resetErrorStatusLogin() {
    setLoginRec(""); // сбросить сообщение об ошибке
  }
  function onLogin({ email, password }) {
    setLoginSending(true);
    setLoginRec(""); // сбросить сообщение об ошибке
    auth
      .login({ email, password })
      .then((res) => {
        const token = res.token;
        //        console.log("авторизация. токен от сервера такой:", token);
        if (!!token) {
          // если токен от сервера пришел
          localStorage.setItem("jwt", token);
          setLoggedIn(true); // разрешаем вход на защищаемый роут <----------
          setEmail(email);
          history.push("/movies"); // добавить флаг для смены меню хедера
        } else {
          // вешаем окошко ошибки авторизации
          setLoginRec("Токен от сервера не пришел");
          console.log("Токен от сервера не пришел");
        }
      })
      .catch((err) => {
        setLoginRec(chekErrorType(err));
      })
      .finally(() => setLoginSending(false));
  }

  // ---------------- Регистрация отлажена -----------------
  const [isRegisterSending, setRegisterSending] = React.useState(false); // ожидание ответа сервера
  const [isRegisterRec, setRegisterRec] = React.useState(""); // сообщение сервера
  function resetErrorStatusRegister() {
    setRegisterRec(""); // сбросить сообщение об ошибке
  }
  function onRegister({ name, email, password }) {
    setRegisterSending(true);
    setRegisterRec(""); // сбросить сообщение об ошибке
    auth
      .register({ name, email, password })
      .then((res) => {
        onLogin({ email, password }); // здесь возможна подстава, что будет не тот пароль и почта
      })
      .catch((err) => {
        setRegisterRec(chekErrorType(err));
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

  //------------------- Обновление профиля отлажено --------------
  const [isEditProfileMode, setEditProfileMode] = React.useState(true); // включить режим редактирования
  const [isProfileSending, setProfileSending] = React.useState(false); // ожидание ответа сервера
  const [isProfileRec, setProfileRec] = React.useState(""); // сообщение сервера
  function onEditProfileMode() {
    setEditProfileMode(true);
  }
  function offEditProfileMode() {
    setEditProfileMode(false);
  }
  function resetErrorStatusProfile() {
    setProfileRec(""); // сбросить сообщение об ошибке
  }
  function onUpdateProfile({ email, name }) {
    setProfileSending(true);
    console.log("Запрос patch на изменение профиля", email, name);
    setProfileRec(""); // сбросить сообщение об ошибке
    api
      .setUserInfo({ name, email })
      .then((newUserData) => {
        console.log("Профиль обновлен-", newUserData);
        //    history.push("/"); // на главную
        setCurrentUser(newUserData);
        setEmail(email);
        setEditProfileMode(false); // снять режим редактирования только при удачном обращении
        setProfileRec(""); // сбросить сообщение об ошибке
      })
      .catch((err) => {
        console.log("Ошибка обновления профиля:", err);
        setProfileRec(chekErrorType(err));
      })
      .finally(() => {
        setProfileSending(false);
      }); // сервер отстрелялся
  }

  function clickExit() {
    onExit();
    console.log("выйти из аккаунта", isRegistered);
    setRegistered(false);
  }

  //----------------------Работа с поиском фильмов -------------
  const [isFoundMovies, setFoundMovies] = React.useState([]); // найденные поиском
  const [isDisplayedMovies, setDisplayedMovies] = React.useState([]); // отображаемые
  const [isLengthMovies, setLengthMovies] = React.useState({
    add: ADD_WIDE,
    left: 0,
  }); // остаток найденных
  const [isNoMoreMovies, setNoMoreMovies] = React.useState(true); // включить режим редактирования
  let additive = ADD_WIDE; // Величина добавки фильмов в ЕЩЕ
  const windowInnerWidth = document.documentElement.clientWidth;

  function onGetMovies(searchString) {
    // по кнопке ПОИСК
    const regexp = new RegExp(`${searchString}`, "gi");
    console.log("регулярное выражение:", regexp);
    console.log("Массив полученных фильмов:", isDownloadedMovies);
    const arrFoundMovies = isDownloadedMovies.filter(
      (item) =>
        regexp.test(item.description) ||
        regexp.test(item.nameRU) ||
        regexp.test(item.nameEN)
    );
    console.log("Массив отфильтрованных фильмов:", arrFoundMovies);
    // выведем первые 6
    setFoundMovies(arrFoundMovies); // обойтись без arrFoundMovies
    setDisplayedMovies(arrFoundMovies.slice(0, 6));
  }

  useEffect(() => {
    // Логика появления кнопки ЕЩЕ

    if (windowInnerWidth < WIDTH_NARROW) {
      additive = ADD_NARROW;
    } else {
      additive = ADD_WIDE;
    }

    console.log("проверяем кнопку ЕЩЕ:", !!isFoundMovies[0]);
    if (
      isDisplayedMovies.length < isFoundMovies.length && // если отображаемых меньше найденных
      !!isDisplayedMovies[0] &&
      !!isFoundMovies[0]
    ) {
      setNoMoreMovies(false); // вешаем кнопку ЕЩЕ
    } else setNoMoreMovies(true);
    setLengthMovies({
      add: additive,
      left: isFoundMovies.length - isDisplayedMovies.length,
    });
  }, [isDisplayedMovies, isFoundMovies]);

  function onNextMovies() {
    // запрос следующих фильмов по кнопке ЕЩЕ

    const array = isDisplayedMovies.concat(
      isFoundMovies.slice(
        isDisplayedMovies.length,
        isDisplayedMovies.length + additive
      )
    );

    console.log("добавим еще фильмы в отображаемый список:", array);
    setDisplayedMovies(array);
  }

  //----------------- Обработка лайка фильма -------------

  function onDeleteAndDislike({ card, setButtonLike }) {
    console.log("будем удалять фильм", card);
    isDisplayedMovies.forEach((item) => {
      item.id === card.id
        ? setButtonLike(false)
        : console.log("не нашли этот фильм:", item.id, card._id);
    });

    
    // mainApi // запрос всех фильмов всех пользователей со своего апи! Переделать сервер
    // .deleteCard(movie._id)
    // .then((res) => {
    //   console.log("удалили фильм:", res);
    //   card.like = false; // добавим или изменим лайк во внутреннем массиве загруженных фильмов
    //   setButtonLike(false);
    // })
    // .catch((err) => {
    //   console.log("фильм не сохранился:", err);
    // });
  }

  function onSaveAndLike({ card, setButtonLike }) {
    console.log("ткнули кнопку лайка. По ней будем сохранять:", card);
    let data = Object.assign({}, card);
    data.movieId = card.id;
    data.image = cardImageUrl + card.image.url;
    data.trailer = card.trailerLink;
    data.thumbnail = cardImageUrl + card.image.formats.thumbnail.url;
    console.log(data);
    mainApi // запрос всех фильмов всех пользователей со своего апи! Переделать сервер
      .setNewCard(data)
      .then((res) => {
        console.log("сохранили фильм:", res);
        card.like = true; // добавим или изменим лайк во внутреннем массиве загруженных фильмов
        setButtonLike(true);
      })
      .catch((err) => {
        console.log("фильм не сохранился:", err);
      });
  }

  function onLikeMovie({ card, setButtonLike }) {
    !!card.like
      ? onDeleteAndDislike({ card, setButtonLike })
      : onSaveAndLike({ card, setButtonLike });
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
              <Movies
                name="movies"
                onGetMovies={onGetMovies}
                isDisplayedMovies={isDisplayedMovies}
                onNextMovies={onNextMovies}
                isNoMoreMovies={isNoMoreMovies}
                isLengthMovies={isLengthMovies}
                сlickButton={onLikeMovie}
              />
              <Footer />
            </Route>
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <Route path="/saved-movies">
              <Header email={email} />
              <Movies
                name="saved-movies"
                onGetMovies={onGetMovies}
                isDisplayedMovies={isDisplayedMovies}
                onNextMovies={onNextMovies}
              />
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
                errStatus={isProfileRec}
                resetErrorStatus={resetErrorStatusProfile}
              ></Profile>
            </Route>
          </ProtectedRoute>
          <Route path="/signup">
            <Register
              onRegister={onRegister}
              isSending={isRegisterSending}
              errStatus={isRegisterRec}
              resetErrorStatus={resetErrorStatusRegister}
            />
          </Route>
          <Route path="/signin">
            <Login
              onLogin={onLogin}
              isSending={isLoginSending}
              errStatus={isLoginRec}
              resetErrorStatus={resetErrorStatusLogin}
            />
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
