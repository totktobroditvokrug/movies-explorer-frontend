import React, { useState } from "react";
import "../MoviesCardList/MoviesCardList.css";
import "../Form/Form.css";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

function MoviesCardList({
  name,
  onGetMovies,
  сlickButton, // клик по кнопке лайка или крестика.
  isSavedMovies,
  isDisplayedMovies,
  isLoading,
  children,
}) {
  const [isSearchString, setSearchString] = useState(""); // стэйт сроки поиска
  const [isflagEmptyReq, setflagEmptyReq] = useState(false); // стэйт флаг пустого запроса

  function handleChangeSearch(event) {
    //    event.preventDefault();
    setSearchString(event.target.value);
  }

  function onFindMovies(event) {
    event.preventDefault();

    isSearchString === "" ? setflagEmptyReq (true) : setflagEmptyReq (false);
    console.log(
      "MoviesCardList-> был сделан запрос к регулярке:",
      isSearchString, isflagEmptyReq
    );
    onGetMovies(isSearchString); // вызвать поисковик с запросом isSearchString
  }

  const [isShortFilm, setShortFilm] = useState(false);
  function toggleSelector() {
    setShortFilm(!isShortFilm);
    console.log("MoviesCardList-> переключатель длительности");
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
      {isflagEmptyReq && (
        <span className="movies__text movies__text_empty">
          пустой запрос, но выдадим всё
        </span>
      )}

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
              key={card.movieId}
              isSavedMovies={isSavedMovies}
              card={card}
              сlickButton={сlickButton}
            />
          ))}
      </ul>
      {isLoading && <Preloader />}
      {children}
    </div>
  );
}

export default MoviesCardList;
