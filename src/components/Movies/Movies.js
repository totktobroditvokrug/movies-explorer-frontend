import React, { useState } from "react";
import "../Movies/Movies.css";
import "../Form/Form.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect } from "react/cjs/react.development";
import { getMoviesFromArray } from "../../utils/found"; // поисковик по регулярке
import { mainApi } from "../../utils/MainApi"; // апи для пользователя
import { cardImageUrl } from "../../utils/constants";
import {
  ADD_NARROW,
  ADD_WIDE,
  WIDTH_NARROW,
  SHORT_FILM_DURATION,
} from "../../utils/constants";

function Movies({ isDownloadedMovies, isMainMovies, setMainMovies }) {
  const [isDisplayedMovies, setDisplayedMovies] = React.useState([]); // будем выводить по кнопке ЕЩЕ
  const [isFoundMovies, setFoundMovies] = React.useState([]); // найденные поиском  с довесом like и _id
  const [isAllFoundMovies, setAllFoundMovies] = React.useState([]); // найденные поиском  с довесом like и _id
  const [isShortFoundMovies, setShortFoundMovies] = React.useState([]); // найденные поиском  с довесом like и _id
  const [isShortFilm, setShortFilm] = useState(false);
  function onGetMovies(searchString) {
    console.log("Movies-> поисковая строка:", searchString);
    setLoading(true); // включить прелоадер
    // по кнопке ПОИСК на вкладке ФИЛЬМЫ
    const arrFoundMovies = getMoviesFromArray(searchString, isDownloadedMovies);
    setAllFoundMovies(arrFoundMovies); // ищем все фильмы несмотря на длительность
    console.log("Movies-> флаг коротких фильмов:", isShortFilm);
    let arrShortMovies = [];
    arrFoundMovies.forEach((item) => {
      console.log("Movies-> длительность:", item.duration);
      if (item.duration < SHORT_FILM_DURATION) arrShortMovies.push(item);
    });
    console.log("Movies-> короткометражки:", arrShortMovies);
    setShortFoundMovies(arrShortMovies); // массив короткометражек

    isShortFilm
      ? setFoundMovies(arrShortMovies)
      : setFoundMovies(arrFoundMovies);
  }
  const [isLoading, setLoading] = useState(false); // для прелоадера
  const [isLengthMovies, setLengthMovies] = React.useState({
    // отобразим в кнопке ЕЩЕ остаток поиска и количество на выдачу
    add: ADD_WIDE,
    left: 0,
  }); // остаток найденных для кнопки ЕЩЕ
  const [isNoMoreMovies, setNoMoreMovies] = React.useState(true); // включить режим редактирования (не кнопка ЕЩЕ)
  let additive = ADD_WIDE; // Величина добавки фильмов в ЕЩЕ
  const windowInnerWidth = document.documentElement.clientWidth; // ширина окна для корректировки выдачи

  //------------------------
  useEffect(() => {
    isShortFilm
      ? setFoundMovies(isShortFoundMovies)
      : setFoundMovies(isAllFoundMovies);
  }, [isShortFilm]);

  useEffect(() => {
    //  Логика появления кнопки ЕЩЕ и выключение прелоадера по изменению найденных фильмов
    setDisplayedMovies([]); // обнуляем выданные фильмы
    setLengthMovies({
      // обнулим остаток и количество на выдачу
      add: additive,
      left: 0,
    });
    console.log("Movies-> Найденные фильмы:", isFoundMovies);
    showCardsMovies([]); // Заполним первые карточки на выдачу
    setLoading(false); // выключить прелоадер
  }, [isFoundMovies]);

  function onNextMovies() {
    // запрос следующих фильмов по кнопке ЕЩЕ
    console.log("Movies-> кнопка ЕЩЕ");
    showCardsMovies(isDisplayedMovies); // выдача по клику ЕЩЕ
  }

  function showCardsMovies(arrDisplayed) {
    if (windowInnerWidth < WIDTH_NARROW) {
      // проверим размер экрана
      additive = ADD_NARROW;
    } else {
      additive = ADD_WIDE;
    }
    const array = arrDisplayed.concat(
      isFoundMovies.slice(
        arrDisplayed.length,
        arrDisplayed.length + isLengthMovies.add
      )
    );
    console.log("Movies-> Добавим еще фильмы в отображаемый список:", array);
    setDisplayedMovies(array);
    if (
      // проверка на нужность кнопки ЕЩЕ
      isFoundMovies.length > array.length && // если есть остаток на выдачу
      !!arrDisplayed &&
      !!isFoundMovies[0]
    ) {
      setLengthMovies({
        // определим остаток и количество на выдачу
        add: additive,
        left: isFoundMovies.length - array.length,
      });
      setNoMoreMovies(false); // вешаем кнопку ЕЩЕ
    } else {
      setNoMoreMovies(true);
      setLengthMovies({
        // определим остаток и количество на выдачу
        add: additive,
        left: 0,
      });
    }
  }
  //-----------------------
  function onDeleteAndDislike({ card, setButtonLike }) {
    console.log("Movies-> будем удалять фильм:", card);
    mainApi
      .deleteCard(card._id)
      .then((res) => {
        console.log("Movies-> удалили фильм:", res);
        let newArray = isMainMovies.slice(); // параллельно серверу живущий массив сохраненных фильмов
        const index = isMainMovies.findIndex(
          (item) => item.movieId == res.movieId
        );
        if (index >= 0) {
          newArray.splice(index, 1);
          console.log("Movies-> удаляем в загруженном списке Main:", newArray);
          setMainMovies(newArray);
        }
        card.like = false; // добавим или изменим лайк во внутреннем массиве загруженных фильмов
        setButtonLike(false);
      })
      .catch((err) => {
        console.log("Movies-> фильм не удалился:", err);
      });
  }

  function onSaveAndLike({ card, setButtonLike }) {
    console.log("Movies-> ткнули кнопку лайка. По ней будем сохранять:", card);
    let data = Object.assign({}, card);
    // data.movieId = card.id;
    data.image = card.image.url;
    // data.trailer = card.trailerLink;
    // data.thumbnail = card.image.formats.thumbnail.url;
    console.log(data);
    mainApi // сохраним по лайку
      .setNewCard(data)
      .then((res) => {
        console.log("Movies-> сохранили фильм:", res);
        card.like = true; // добавим или изменим лайк во внутреннем массиве загруженных фильмов
        card._id = res._id; // присвоим идентификатор из БД
        setButtonLike(true);
        let arr = isMainMovies.slice(); // синхронизируем сохраненный массив с сервером
        arr.push(res);
        console.log("Movies-> добавили сохраненный фильм:", arr);
        setMainMovies(arr);
      })
      .catch((err) => {
        console.log("Movies-> фильм не сохранился:", err);
      });
  }

  function onLikeMovie({ card, setButtonLike }) {
    console.log(
      "Movies-> Обрабатываем клик по:",
      card.id,
      "состояние лайка:",
      !!card.like
    );
    !!card.like
      ? onDeleteAndDislike({ card, setButtonLike }) // если был лайк- пробуем удалить из избранного
      : onSaveAndLike({ card, setButtonLike });
  }

  //-------------------------

  return (
    <MoviesCardList
      name="movies"
      onGetMovies={onGetMovies}
      сlickButton={onLikeMovie}
      isSavedMovies={false}
      isDisplayedMovies={isDisplayedMovies}
      isLoading={isLoading}
      isShortFilm={isShortFilm}
      setShortFilm={setShortFilm}
    >
      {!isNoMoreMovies && (
        <button className="movies__next" type="button" onClick={onNextMovies}>
          {`Ещё ${isLengthMovies.add} из ${isLengthMovies.left}`}
        </button>
      )}
    </MoviesCardList>
  );
}

export default Movies;
