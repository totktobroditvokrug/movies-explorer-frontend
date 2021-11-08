import React, { useState } from "react";
import "../Movies/Movies.css";
import "../Form/Form.css";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function Movies({ name, onGetMovies, isFoundMovies }) {
  const [isLoading, setLoading] = useState(false);
  let isSavedMovies=false;
  const location = useLocation();
  location.pathname==='/saved-movies' ? isSavedMovies=true : isSavedMovies=false;

  function clickPreloader() {
    onGetMovies();
    setLoading(!isLoading);
  }
  const [isShortFilm, setShortFilm] = useState(false);

  function toggleSelector() {
    setShortFilm(!isShortFilm);
    console.log('Массив выбранных фильмов:', isFoundMovies);
  }

  return (
    <div className="body movies">
      <form className="movies__find" name={name} noValidate>
        <input type="text" className="movies__input" placeholder="Фильм" />
        <button
          className="movies__button-find"
          type="button"
          onClick={clickPreloader}
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
      {isLoading && <Preloader />}
      {!isLoading && (
        <ul className="movies__list">
          {isFoundMovies.map((card) => (
            <MoviesCard
              key={card.movieId}
              isSavedMovies={isSavedMovies}
              card={card}
            />
          ))}
        </ul>
      )}
      <button className="movies__next" type="button">
        Ещё
      </button>
    </div>
  );
}

export default Movies;
