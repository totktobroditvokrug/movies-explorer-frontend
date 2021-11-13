import React, { useState } from "react";
import "../SavedMovies/SavedMovies.css";
import "../Form/Form.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect } from "react/cjs/react.development";
import { mainApi } from "../../utils/MainApi"; // апи для пользователя
import { getMoviesFromArray } from "../../utils/found"; // поисковик по регулярке

function SavedMovies({ isMainMovies, setMainMovies }) {
  const [isFoundSavedMovies, setFoundSavedMovies] = React.useState([]); // найденные поиском
  function onGetSavedMovies(searchString) {
    // по кнопке ПОИСК на вкладке ФИЛЬМЫ
    const arrFoundMovies = getMoviesFromArray(searchString, isMainMovies);
    setFoundSavedMovies(arrFoundMovies); //
  }

  function onDeleteAndDislike({ card }) {
    console.log("SavedMovies-> будем удалять фильм:", card);
    mainApi
      .deleteCard(card._id)
      .then((res) => {
        let newArrayMain = isMainMovies.slice(); // параллельно серверу живущий массив сохраненных фильмов
        const indexMain = isMainMovies.findIndex(
          (item) => item.movieId === res.movieId
        );
        if (indexMain >= 0) {
          newArrayMain.splice(indexMain, 1);
          console.log(
            "Movies-> удаляем в загруженном списке Main:",
            newArrayMain
          );
          setMainMovies(newArrayMain); // это дополнительно пересортирует основной массив и отменит лайки
        }
        console.log(
          "SavedMovies-> удалили фильм movieId=",
          res.movieId
        );

        const indexFound = isFoundSavedMovies.findIndex(
          (item) => item.movieId === res.movieId
        ); // удаляемый индекс
        if (indexFound >= 0) {
          let newArrayFound = isFoundSavedMovies.slice();
          newArrayFound.splice(indexFound, 1);
          setFoundSavedMovies(newArrayFound); // удалит из поиска
        }
      })
      .catch((err) => {
        console.log("SavedMovies-> фильм не удалился:", err);
      });
  }

  return (
    <MoviesCardList
      name="saved-movies"
      onGetMovies={onGetSavedMovies}
      isDisplayedMovies={isFoundSavedMovies}
      сlickButton={onDeleteAndDislike}
      isSavedMovies={true}
    />
  );
}

export default SavedMovies;
