import React, { useState } from "react";
import "../MoviesCard/MoviesCard.css";
import { cardImageUrl } from "../../utils/constants";

function MoviesCard({ isSavedMovies, card }) {
  const [isButtonLike, setButtonLike] = useState(false);

  function toggleLike() {
    setButtonLike(!isButtonLike);
  }
  function clickButton() {
    if (!isSavedMovies) toggleLike();
  }

  return (
    <li className="card">
      <div className="card__wrapp">
        <div className="card__description">
          <h1 className="card__title">{card.nameRU}</h1>
          <p className="card__duration">{card.duration}</p>
        </div>

        <button
          className={`card__button ${isButtonLike ? "" : "card__button_like "} 
                ${isSavedMovies ? "card__button_delete" : ""}`}
          onClick={clickButton}
        ></button>
      </div>
      <img src={cardImageUrl+card.image.url} alt="" className="card__poster" />
    </li>
  );
}

export default MoviesCard;
