import React, { useState } from "react";
import "../MoviesCardList/MoviesCardList.css";
import "../Form/Form.css";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { ADD_NARROW, ADD_WIDE, WIDTH_NARROW } from "../../utils/constants";

function MoviesCardList({
  name,
  onGetMovies,
  isDisplayedMovies,
  сlickButton, // клик по кнопке лайка или крестика.
  isSavedMovies
}) {

  const [isSearchString, setSearchString] = useState(""); // стэйт сроки поиска
  function handleChangeSearch(event) {
    //    event.preventDefault();
    setSearchString(event.target.value);
  }

  useEffect(() => {
    // дожидается отработки стэйта setFoundMovies
    console.log("MoviesCardList-> выбранные фильмы:", isDisplayedMovies);
    setLoading(false); // выключить прелоадер
  }, [isDisplayedMovies]);
  const [isLoading, setLoading] = useState(false);

  function onFindMovies(event) {
    event.preventDefault();
    // сюда воткнуть поисковый запрос в переменные функции
    setLoading(true); // включить прелоадер
    onGetMovies(isSearchString); // вызвать поисковик с запросом isSearchString
    console.log("MoviesCardList-> был сделан запрос к регулярке:", isSearchString);
  }
  const [isShortFilm, setShortFilm] = useState(false);

  function toggleSelector() {
    setShortFilm(!isShortFilm);
    console.log("MoviesCardList-> переключатель длительности");
  }

//------------------------
// useEffect(() => {
  // Логика появления кнопки ЕЩЕ

//   if (windowInnerWidth < WIDTH_NARROW) {
//     additive = ADD_NARROW;
//   } else {
//     additive = ADD_WIDE;
//   }

//   console.log("проверяем кнопку ЕЩЕ:", !!isFoundMovies[0]);
//   if (
//     isDisplayedMovies.length < isFoundMovies.length && // если отображаемых меньше найденных
//     !!isDisplayedMovies[0] &&
//     !!isFoundMovies[0]
//   ) {
//     setNoMoreMovies(false); // вешаем кнопку ЕЩЕ
//   } else setNoMoreMovies(true);
//   setLengthMovies({
//     add: additive,
//     left: isFoundMovies.length - isDisplayedMovies.length,
//   });
// }, [isDisplayedMovies, isFoundMovies, isMainMovies]);
function onNextMovies() {

  console.log('MoviesCardList-> кнопка ЕЩЕ');
  // запрос следующих фильмов по кнопке ЕЩЕ

  // const array = isDisplayedMovies.concat(
  //   isFoundMovies.slice(
  //     isDisplayedMovies.length,
  //     isDisplayedMovies.length + additive
  //   )
  // );

  // console.log("добавим еще фильмы в отображаемый список:", array);
  // setDisplayedMovies(array);
}


// const [isDisplayedMovies, setDisplayedMovies] = React.useState([]); // отображаемые
const [isLengthMovies, setLengthMovies] = React.useState({
  add: ADD_WIDE,
  left: 0,
}); // остаток найденных
const [isNoMoreMovies, setNoMoreMovies] = React.useState(true); // включить режим редактирования
// let additive = ADD_WIDE; // Величина добавки фильмов в ЕЩЕ
// const windowInnerWidth = document.documentElement.clientWidth; // ширина окна для корректировки выдачи

  return (
    <div className="body movies">
      <form className="movies__find" name={name} noValidate>
        <input
          type="text"
          className="movies__input"
          placeholder="Фильм"
          onChange={handleChangeSearch}
        />
        <button
          className="movies__button-find"
          type="submit"
          onClick={onFindMovies}
        >
          Поиск
        </button>
      </form>
      <div className="movies__select">
        <button
          className={`movies__button-select ${
            isShortFilm ? "" : "movies__button-select_off "
          }`}
          type="button"
          onClick={toggleSelector}
        />
        <p className="movies__text">Короткометражки</p>
      </div>
      <ul className="movies__list">
        {!!isDisplayedMovies &&
          isDisplayedMovies.map((card) => (
            <MoviesCard
              key={!!card.id ? card.id : card.movieId}
              isSavedMovies={isSavedMovies}
              card={card}
              сlickButton={сlickButton}
            />
          ))}
      </ul>
      {isLoading && <Preloader />}
      {!isNoMoreMovies && (
        <button className="movies__next" type="button" onClick={onNextMovies}>
          {`Ещё ${isLengthMovies.add} из ${isLengthMovies.left}`}
        </button>
      )}
    </div>
  );
}

export default MoviesCardList;
