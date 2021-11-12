import React, { useState } from "react";
import "../SavedMovies/SavedMovies.css";
import "../Form/Form.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect } from "react/cjs/react.development";
import { mainApi } from "../../utils/MainApi"; // апи для пользователя
import { getMoviesFromArray } from "../../utils/found"; // поисковик по регулярке

function SavedMovies({ isMainMovies }) {
  const [isFoundMovies, setFoundMovies] = React.useState([]); // найденные поиском
  function onGetSavedMovies(searchString) {
    // по кнопке ПОИСК на вкладке ФИЛЬМЫ
    const arrFoundMovies = getMoviesFromArray(searchString, isMainMovies);
    setFoundMovies(arrFoundMovies); //
  }

  function onDeleteAndDislike({ card }) {
    console.log("Будем удалять фильм:", card);
    mainApi 
      .deleteCard(card._id)
      .then((res) => {
        console.log("удалили фильм:", isFoundMovies.findIndex((item) => item.movieId == res.movieId));
        let newArray = isFoundMovies.slice();
        const index = isFoundMovies.findIndex((item) => item.movieId == res.movieId); // удаляемый индекс
        newArray.splice(index, 1);
        setFoundMovies(newArray);

 //       card.like = false; // добавим или изменим лайк во внутреннем массиве загруженных фильмов
//        setButtonLike(false);
      })
      .catch((err) => {
        console.log("фильм не удалился:", err);
      });
  }

  return (
    <MoviesCardList
      name="saved-movies"
      onGetMovies={onGetSavedMovies}
      isDisplayedMovies={isFoundMovies}
      сlickButton={onDeleteAndDislike}
      isSavedMovies={true}
    />
  );
}

export default SavedMovies;
