import React from "react";
import "../Movies/Movies.css";
import "../Form/Form.css";
import { initialCards } from "../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";

function Movies({ name, isSavedMovies }) {
  return (
    <div className="body movies">
      <form className="movies__find" name={name} noValidate>
        <input 
          type="text" 
          className="movies__input"
          placeholder="Фильм"  
        />
        <button className="movies__button" type="submit">
          Поиск
        </button>
      </form>
      {
        <ul className="movies__list">
          {initialCards.map((card) => (
            <MoviesCard
              key={card.movieId}
              isSavedMovies={isSavedMovies}
              card={card}
            />
          ))}
        </ul>
      }
      <p>ohjpohjpohjo</p>
    </div>
  );
}

export default Movies;
