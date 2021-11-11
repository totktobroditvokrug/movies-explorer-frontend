import React, { useState } from "react";
import "../Movies/Movies.css";
import "../Form/Form.css";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

function Movies({
  name,
  onGetMovies,
  isDisplayedMovies,
  onNextMovies,
  isNoMoreMovies,
  isLengthMovies,
  сlickButton, // клик по кнопке лайка или крестика.
}) {

  const [isSearchString, setSearchString] = useState(""); // стэйт сроки поиска
  function handleChangeSearch(event) {
    //    event.preventDefault();
    setSearchString(event.target.value);
  }
  let isSavedMovies = false;
  useEffect(() => {
    // дожидается отработки стэйта setFoundMovies
    console.log("Выбранные фильмы:", isDisplayedMovies);
    setLoading(false); // выключить прелоадер
  }, [isDisplayedMovies]);
  const [isLoading, setLoading] = useState(false);

  const location = useLocation();
  location.pathname === "/saved-movies"
    ? (isSavedMovies = true)
    : (isSavedMovies = false);

  function onFindMovies(event) {
    event.preventDefault();
    // сюда воткнуть поисковый запрос в переменные функции
    setLoading(true); // включить прелоадер
    onGetMovies(isSearchString); // вызвать поисковик с запросом isSearchString
  }
  const [isShortFilm, setShortFilm] = useState(false);

  function toggleSelector() {
    setShortFilm(!isShortFilm);
    console.log("переключатель длительности");
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
              key={card.id}
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

export default Movies;
