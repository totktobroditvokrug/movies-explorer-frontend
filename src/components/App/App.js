import React, { useEffect } from "react";
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
import SavedMovies from "../SavedMovies/SavedMovies";
import * as auth from "../../utils/auth";
import { api } from "../../utils/api.js";
import { moviesApi } from "../../utils/MoviesApi"; // внешний апи с фильмами
import { mainApi } from "../../utils/MainApi"; // апи для пользователя
import { chekErrorType } from "../../utils/err_const";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";

function App() {
 // const [isRegistered, setRegistered] = useState(false);

  //---------------- Все загруженные карточки фильмов -------------
  const [isDownloadedMovies, setDownloadedMovies] = React.useState([]); // внешний список фильмов
  const [isMainMovies, setMainMovies] = React.useState([]); // список фильмов на внутреннем сервере
  const [isErrMainMovies, setErrMainMovies] = React.useState(''); // проблемы на внутреннем сервере
  const [isErrDownloadedMovies, setErrDownloadedMovies] = React.useState(''); // проблемы на внутреннем сервере
  //---------- состояния и обработчики пользователя
  const [currentUser, setCurrentUser] = React.useState({ data: {} });
  const [loggedIn, setLoggedIn] = React.useState(false); // При авторизации будем перезаписывать юзера и переполучать токен

  useEffect(() => {
    // console.log("loggedIn:", loggedIn);
    if (loggedIn) {
      // // console.log('запрос к апи за данными пользователя token=', localStorage.getItem('jwt'));
      api
        .getUserInfo() // запрос к апи за данными пользователя
        .then((data) => {
          // console.log("данные пользователя от getUserInfo:", data);
          setCurrentUser(data);
        })
        .catch((err) => {
          // console.log("ошибка получения данных пользователя", err);
        });

      //--------------- Работа с фильмами ---------------
      // console.log("App-> Запрос фильмов");
      moviesApi // запрос всех фильмов с внешнего апи
        .getInitialCards()
        .then((data) => {
          setDownloadedMovies(data);
          setErrDownloadedMovies('');
          // console.log("App-> Данные с внешними фильмами пришли:"); // выполняется до загрузки массива
        })
        .catch((err) => {
          // console.log("App-> данные внешними фильмами не пришли:", err);
          setErrDownloadedMovies(chekErrorType(err));
        });

      mainApi // запрос всех фильмов всех пользователей со своего апи! Переделать сервер
        .getInitialCards()
        .then((data) => {
          // console.log("App-> фильмы с моего сервера пришли:");
          setMainMovies(data);
          setErrMainMovies('');
          //  // console.log("Данные пришли:", isMainMovies); // выполняется до загрузки массива
        })
        .catch((err) => {
          // console.log("App-> данные с моего сервера не пришли:", err);
          setErrMainMovies(chekErrorType(err));
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
        //        // console.log("авторизация. токен от сервера такой:", token);
        if (!!token) {
          // если токен от сервера пришел
          localStorage.setItem("jwt", token);
          setLoggedIn(true); // разрешаем вход на защищаемый роут <----------
          setEmail(email);
          history.push("/movies"); // добавить флаг для смены меню хедера
        } else {
          // вешаем окошко ошибки авторизации
          setLoginRec("Токен от сервера не пришел");
          // console.log("Токен от сервера не пришел");
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
    // // console.log('убили токен, ушли на регистрацию, loggedIn=', loggedIn);
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
      // // console.log('токен:', jwt);
      auth
        .checkToken(jwt)
        .then((res) => {
          // // console.log('при получении токена', res);
          if (res.data.email) {
            // если в ответе есть емэйл, считаем токен живым
            setLoggedIn(true); // разрешаем вход на защищаемый роут <----------
            setEmail(res.data.email);
            history.push("/");
          } else {
            setLoggedIn(false); // запрет на вход
            // // console.log('проблемы с токеном:');
            history.push("/signin");
          }
        })
        .catch((err) => {
          // // console.log('ошибка проверки токена:', err);
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
    //  // console.log("Запрос patch на изменение профиля", email, name);
    setProfileRec(""); // сбросить сообщение об ошибке
    api
      .setUserInfo({ name, email })
      .then((newUserData) => {
        // console.log("Профиль обновлен-", newUserData);
        //    history.push("/"); // на главную
        setCurrentUser(newUserData);
        setEmail(email);
        setEditProfileMode(false); // снять режим редактирования только при удачном обращении
        setProfileRec(""); // сбросить сообщение об ошибке
      })
      .catch((err) => {
        // console.log("Ошибка обновления профиля:", err);
        setProfileRec(chekErrorType(err));
      })
      .finally(() => {
        setProfileSending(false);
      }); // сервер отстрелялся
  }

  function clickExit() {
    onExit();
    // console.log("выйти из аккаунта", isRegistered);
  //  setRegistered(false);
  }

  //------------------- концепция перерисовки фильмов  по двум основным массивам ------------- !!!!!!!
  //----------------- пересортировка загруженных фильмов по сохраненным -------------
  useEffect(() => {
    let resortedArray = isDownloadedMovies.slice(); // загруженные с сервера
    resortedArray.forEach((item) => {
      item.like = false; // если фильм убрали из сохраненных
      item.movieId = item.id;
      item.thumbnail = item.image.formats.thumbnail.url;
      // if (!!item.image.url) item.image = item.image.url;
      item.trailer = item.trailerLink;
      isMainMovies.forEach((data) => {
      //  data.id = data.moveId;
      //  // console.log('App-> перебор фильмов. id=', item.id, ' movieId=', data.movieId);
        if (data.movieId === item.id) {
          // если в сохраненных есть такой moveId - добавим поля
          item.like = true; // проставим флажок лайка-сохраненного
          item._id = data._id; // и айди БД
        }
      });
    });
    // console.log('App-> пересортировка по изменению сохраненных фильмов:');
//    // console.log('App-> сохраненные фильмы:', isMainMovies);
    setDownloadedMovies(resortedArray); // новый массив. ожидаем рендер
  }, [isMainMovies, isDownloadedMovies.length]);

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
                isDownloadedMovies={isDownloadedMovies} // все загруженные фильмы с внешнего сервера
                isMainMovies={isMainMovies} // массив сохраненных фильмов
                setMainMovies={setMainMovies}
                isErrDownloadedMovies={isErrDownloadedMovies}
              />
              <Footer />
            </Route>
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <Route path="/saved-movies">
              <Header email={email} />
              <SavedMovies
                isMainMovies={isMainMovies} // пока выдадим все сохраненные
                setMainMovies={setMainMovies} // заменить на setMainMovies
                isErrMainMovies={isErrMainMovies} // сообщение об ошибке сервера
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
