import React, { useState } from "react";
import "../Movies/Movies.css";
import "../Form/Form.css";
import Preloader from "../Preloader/Preloader";
import { initialCards } from "../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";

function Movies({ name, isSavedMovies }) {
  const [isLoading, setLoading] = useState(false);

  function clickPreloader() {
    setLoading(!isLoading);
  }
  const [isShortFilm, setShortFilm] = useState(false);

  function toggleSelector() {
    setShortFilm(!isShortFilm);
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
          {initialCards.map((card) => (
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
