import React, { useState } from "react";
import "../SavedMovies/SavedMovies.css";
import "../Form/Form.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect } from "react/cjs/react.development";
import { mainApi } from "../../utils/MainApi"; // апи для пользователя
import { getMoviesFromArray } from "../../utils/found"; // поисковик по регулярке

function SavedMovies({ isMainMovies, setMainMovies }) {
  const [isDisplayedMovies, setDisplayedMovies] = React.useState([]); // будем выводить по кнопке ЕЩЕ
  //---------------------------
  const [isLoading, setLoading] = useState(false); // для прелоадера
  function onGetSavedMovies(searchString) {    // по кнопке ПОИСК на вкладке ФИЛЬМЫ
    setLoading(true); // включить прелоадер
    const arrFoundMovies = getMoviesFromArray(searchString, isMainMovies);
    setDisplayedMovies(arrFoundMovies); //
  }
  useEffect(() => {
    console.log("SavedMovies-> Найденные фильмы:", isDisplayedMovies);
    setLoading(false); // выключить прелоадер
  }, [isDisplayedMovies]);

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
        const indexDisplayed = isDisplayedMovies.findIndex(
          (item) => item.movieId === res.movieId
        ); // удаляемый индекс
        if (indexDisplayed >= 0) {
          let newArrayDisplayed = isDisplayedMovies.slice();
          newArrayDisplayed.splice(indexDisplayed, 1);
          console.log('SavedMovies-> удаляем из массива отображаемых фильмов:', newArrayDisplayed); 
          setDisplayedMovies(newArrayDisplayed); // удалит из выдачи
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
      сlickButton={onDeleteAndDislike}
      isSavedMovies={true}
      isDisplayedMovies={isDisplayedMovies}
      isLoading={isLoading}
    />
  );
}

export default SavedMovies;
