import React, { useState } from "react";
import "../Movies/Movies.css";
import "../Form/Form.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useLocation } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { getMoviesFromArray } from "../../utils/found"; // поисковик по регулярке
import { mainApi } from "../../utils/MainApi"; // апи для пользователя
import { cardImageUrl } from "../../utils/constants";

function Movies({ isDownloadedMovies, isIdSavedMovies }) {
  const [isFoundMovies, setFoundMovies] = React.useState([]); // найденные поиском
  function onGetMovies(searchString) {
    // по кнопке ПОИСК на вкладке ФИЛЬМЫ
    const arrFoundMovies = getMoviesFromArray(searchString, isDownloadedMovies);
    arrFoundMovies.forEach((item) => {
      isIdSavedMovies.forEach((data) => {
        if (data.movieId == item.id) {
          item.like = true; // проставим флажок лайка
          item._id = data._id; // и айди БД
        }
      });
      console.log(item);
    });
    setFoundMovies(arrFoundMovies); //
  }

  //-----------------------
  function onDeleteAndDislike({ card, setButtonLike }) {
    console.log("Будем удалять фильм:", card);
    mainApi // запрос всех фильмов всех пользователей со своего апи! Переделать сервер
      .deleteCard(card._id)
      .then((res) => {
        console.log("удалили фильм:", res);
        card.like = false; // добавим или изменим лайк во внутреннем массиве загруженных фильмов
        setButtonLike(false);
      })
      .catch((err) => {
        console.log("фильм не удалился:", err);
      });
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
        card._id = res._id; // присвоим идентификатор из БД
        setButtonLike(true);
      })
      .catch((err) => {
        console.log("фильм не сохранился:", err);
      });
  }

  function onLikeMovie({ card, setButtonLike }) {
    console.log(
      "Обрабатываем клик по:",
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
      isDisplayedMovies={isFoundMovies} // будем отдавать сразу все фильмы, кнопку ЕЩЕ перенесем в cardlist
      сlickButton={onLikeMovie}
      isSavedMovies={false}
    />
  );
}

export default Movies;
