import React, { useState } from "react";
import "../MoviesCard/MoviesCard.css";
import { cardImageUrl } from "../../utils/constants";

function MoviesCard({ isSavedMovies, card, сlickButton }) {
  const [isButtonLike, setButtonLike] = useState(!!card.like);

  function handleClick() {
    сlickButton({ card, setButtonLike });
  }

  return (
    <li id={`card-list${card.id}`} className="card">
      <div className="card__wrapp">
        <div className="card__description">
          <h1 className="card__title">{card.nameRU}</h1>
          <p className="card__duration">{Math.trunc(card.duration/60)}ч {card.duration%60}м</p>
        </div>
        <button
          className={`card__button ${isButtonLike ? "card__button_like " : ""} 
                ${isSavedMovies ? "card__button_delete" : ""}`}
          onClick={handleClick}
        ></button>
      </div>
      <a href={card.trailer} target="_blank">
        <img
          src={cardImageUrl + card.thumbnail}
          alt={card.nameEN}
          className="card__poster"
        />
      </a>
    </li>
  );
}

export default MoviesCard;
