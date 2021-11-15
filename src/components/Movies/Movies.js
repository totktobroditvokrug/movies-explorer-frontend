import React, { useState } from "react";
import "../Movies/Movies.css";
import "../Form/Form.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useLocation } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { getMoviesFromArray } from "../../utils/found"; // поисковик по регулярке
import { mainApi } from "../../utils/MainApi"; // апи для пользователя
import { cardImageUrl } from "../../utils/constants";

function Movies({ isDownloadedMovies, isMainMovies, setMainMovies }) {
  const [isFoundMovies, setFoundMovies] = React.useState([]); // найденные поиском  с довесом like и _id
  function onGetMovies(searchString) {
    // по кнопке ПОИСК на вкладке ФИЛЬМЫ
    const arrFoundMovies = getMoviesFromArray(searchString, isDownloadedMovies);
    setFoundMovies(arrFoundMovies);
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
    data.movieId = card.id;
    data.image = cardImageUrl + card.image.url;
    data.trailer = card.trailerLink;
    data.thumbnail = cardImageUrl + card.image.formats.thumbnail.url;
    console.log(data);
    mainApi // запрос всех фильмов всех пользователей со своего апи! Переделать сервер
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

  //----------------- Обработка дизлайка фильма из SavedMovies-------------
  // useEffect(() => {
  //   let newArray = isFoundMovies.slice();
  //   const index = isFoundMovies.findIndex(
  //     (item) => item.movieId === isDeleteId
  //   );
  //   if (index >= 0) {
  //     newArray.splice(index, 1);
  //     console.log(
  //       "Movies-> удаляем в уже найденных Found:",
  //       index,
  //       "из:",
  //       newArray
  //     );
  //     setFoundMovies(newArray);
  //   }
  // }, [isDeleteId]);

  return (
    <MoviesCardList
      name="movies"
      onGetMovies={onGetMovies}
      isFoundMovies={isFoundMovies} // будем отдавать сразу все фильмы, кнопку ЕЩЕ перенесем в cardlist
      сlickButton={onLikeMovie}
      isSavedMovies={false}
    />
  );
}

export default Movies;
