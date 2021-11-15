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
  isFoundMovies,
  сlickButton, // клик по кнопке лайка или крестика.
  isSavedMovies,
}) {
  const [isDisplayedMovies, setDisplayedMovies] = React.useState([]); // будем выводить по кнопке ЕЩЕ
  const [isLengthMovies, setLengthMovies] = React.useState({
    // отобразим в кнопке ЕЩЕ остаток поиска и количество на выдачу
    add: ADD_WIDE,
    left: 0,
  }); // остаток найденных для кнопки ЕЩЕ
  const [isSearchString, setSearchString] = useState(""); // стэйт сроки поиска
  function handleChangeSearch(event) {
    //    event.preventDefault();
    setSearchString(event.target.value);
  }
  const [isNoMoreMovies, setNoMoreMovies] = React.useState(true); // включить режим редактирования (не кнопка ЕЩЕ)
  let additive = ADD_WIDE; // Величина добавки фильмов в ЕЩЕ
  const windowInnerWidth = document.documentElement.clientWidth; // ширина окна для корректировки выдачи

  useEffect(() => {
    // дожидается отработки стэйта setFoundMovies
    console.log("MoviesCardList-> выбранные фильмы:", isFoundMovies);
    setLoading(false); // выключить прелоадер
  }, [isFoundMovies]);
  const [isLoading, setLoading] = useState(false);

  function onFindMovies(event) {
    event.preventDefault();
    // сюда воткнуть поисковый запрос в переменные функции
    setLoading(true); // включить прелоадер
    onGetMovies(isSearchString); // вызвать поисковик с запросом isSearchString
    console.log(
      "MoviesCardList-> был сделан запрос к регулярке:",
      isSearchString
    );
  }
  const [isShortFilm, setShortFilm] = useState(false);

  function toggleSelector() {
    setShortFilm(!isShortFilm);
    console.log("MoviesCardList-> переключатель длительности");
  }

  //------------------------
  useEffect(() => {
    //  Логика появления кнопки ЕЩЕ
    showCardsMovies(); // Заполним первые карточки на выдачу
    console.log(
      "MovieCardList-> проверяем кнопку ЕЩЕ. isDisplayedMovies:",
      isDisplayedMovies
    );
    console.log("MovieCardList-> Найденные фильмы:", isFoundMovies);
    if (
      isDisplayedMovies.length < isFoundMovies.length && // если отображаемых меньше найденных
      !!isDisplayedMovies &&
      !!isFoundMovies[0]
    ) {
      setNoMoreMovies(false); // вешаем кнопку ЕЩЕ
    } else setNoMoreMovies(true);
  }, [isFoundMovies]);

  function onNextMovies() {
    // запрос следующих фильмов по кнопке ЕЩЕ
    console.log("MoviesCardList-> кнопка ЕЩЕ");
    showCardsMovies(); // выдача по клику ЕЩЕ
  }

  function showCardsMovies() {
    if (windowInnerWidth < WIDTH_NARROW) { // проверим размер экрана
      additive = ADD_NARROW;
    } else {
      additive = ADD_WIDE;
    }
    setLengthMovies({ // определим остаток и количество на выдачу
      add: additive,
      left: isFoundMovies.length - isDisplayedMovies.length,
    });
    const array = isDisplayedMovies.concat(
      isFoundMovies.slice(
        isDisplayedMovies.length,
        isDisplayedMovies.length + isLengthMovies.add
      )
    );

    console.log("добавим еще фильмы в отображаемый список:", array);
    setDisplayedMovies(array);
  }

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
