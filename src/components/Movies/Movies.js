import React, { useState } from "react";
import "../Movies/Movies.css";
import "../Form/Form.css";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

function Movies({ name, onGetMovies, isFoundMovies, onNextMovies, isNoMoreMovies }) {
  let isSavedMovies = false;
  useEffect(() => {
    // дожидается отработки стэйта setFoundMovies
    console.log("Выбранные фильмы:", isFoundMovies);
    setLoading(false); // выключить прелоадер
  }, [isFoundMovies]);
  const [isLoading, setLoading] = useState(false);

  const location = useLocation();
  location.pathname === "/saved-movies"
    ? (isSavedMovies = true)
    : (isSavedMovies = false);

  function onFindMovies() {
    // сюда воткнуть поисковый запрос в переменные функции
    setLoading(true); // включить прелоадер
    onGetMovies();
  }
  const [isShortFilm, setShortFilm] = useState(false);

  function toggleSelector() {
    setShortFilm(!isShortFilm);
    console.log("Массив выбранных фильмов:", isFoundMovies);
  }

  return (
    <div className="body movies">
      <form className="movies__find" name={name} noValidate>
        <input type="text" className="movies__input" placeholder="Фильм" />
        <button
          className="movies__button-find"
          type="button"
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
        {!!isFoundMovies &&
          isFoundMovies.map((card) => (
            <MoviesCard
              key={card.id}
              isSavedMovies={isSavedMovies}
              card={card}
            />
          ))}
      </ul>
      {isLoading && <Preloader />}
      {
        !isNoMoreMovies && (
          <button className="movies__next" type="button" onClick={onNextMovies}>
            Ещё
          </button>          
        )
      }

    </div>
  );
}

export default Movies;
