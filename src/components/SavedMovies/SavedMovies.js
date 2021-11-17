import React, { useState, useEffect} from "react";
import "../SavedMovies/SavedMovies.css";
import "../Form/Form.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { mainApi } from "../../utils/MainApi"; // апи для пользователя
import { getMoviesFromArray } from "../../utils/found"; // поисковик по регулярке
import { SHORT_FILM_DURATION } from "../../utils/constants";

function SavedMovies({ isMainMovies, setMainMovies, isErrMainMovies }) {
  const [isShortFilm, setShortFilm] = useState(false);
  const [isDisplayedMovies, setDisplayedMovies] = React.useState([]); // будем выводить по кнопке ЕЩЕ
  const [isAllFoundMovies, setAllFoundMovies] = React.useState([]);
  const [isShortFoundMovies, setShortFoundMovies] = React.useState([]);
  const [isLoading, setLoading] = useState(false); // для прелоадера
  function onGetSavedMovies(searchString) {
    // по кнопке ПОИСК на вкладке ФИЛЬМЫ
    setLoading(true); // включить прелоадер
    const arrFoundMovies = getMoviesFromArray(searchString, isMainMovies);
    setAllFoundMovies(arrFoundMovies); // ищем все фильмы несмотря на длительность
    // console.log("SavedMovies-> флаг коротких фильмов:", isShortFilm);
    let arrShortMovies = [];
    arrFoundMovies.forEach((item) => {
      // console.log("SavedMovies-> длительность:", item.duration);
      if (item.duration < SHORT_FILM_DURATION) arrShortMovies.push(item);
    });
    // console.log("SavedMovies-> короткометражки:", arrShortMovies);
    setShortFoundMovies(arrShortMovies); // массив короткометражек

    isShortFilm
      ? setDisplayedMovies(arrShortMovies)
      : setDisplayedMovies(arrFoundMovies);
  }

  useEffect(() => {
    // console.log("SavedMovies-> Найденные фильмы:", isDisplayedMovies);
    setLoading(false); // выключить прелоадер
  }, [isDisplayedMovies]);

  useEffect(() => {
    if (!!isShortFoundMovies && !!isAllFoundMovies) {
      isShortFilm
        ? setDisplayedMovies(isShortFoundMovies)
        : setDisplayedMovies(isAllFoundMovies);
    }
  }, [isShortFilm]);

  function onDeleteAndDislike({ card }) {
    // console.log("SavedMovies-> будем удалять фильм:", card);
    mainApi
      .deleteCard(card._id)
      .then((res) => {
        let newArrayMain = isMainMovies.slice(); // параллельно серверу живущий массив сохраненных фильмов
        const indexMain = isMainMovies.findIndex(
          (item) => item.movieId === res.movieId
        );
        if (indexMain >= 0) {
          newArrayMain.splice(indexMain, 1);
          // console.log(
          //   "Movies-> удаляем в загруженном списке Main:",
          //   newArrayMain
          // );
          setMainMovies(newArrayMain); // это дополнительно пересортирует основной массив и отменит лайки
        }
        // console.log("SavedMovies-> удалили фильм movieId=", res.movieId);
        const indexDisplayed = isDisplayedMovies.findIndex(
          (item) => item.movieId === res.movieId
        ); // удаляемый индекс
        if (indexDisplayed >= 0) {
          let newArrayDisplayed = isDisplayedMovies.slice();
          newArrayDisplayed.splice(indexDisplayed, 1);
          // console.log(
          //   "SavedMovies-> удаляем из массива отображаемых фильмов:",
          //   newArrayDisplayed
          // );
          setDisplayedMovies(newArrayDisplayed); // удалит из выдачи
        }
      })
      .catch((err) => {
        // console.log("SavedMovies-> фильм не удалился:", err);
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
      isShortFilm={isShortFilm}
      setShortFilm={setShortFilm}
      isErrMovies={isErrMainMovies}
    />
  );
}

export default SavedMovies;
