import React, { useState, useEffect } from "react";
import "../MoviesCard/MoviesCard.css";
import { cardImageUrl } from "../../utils/constants";

function MoviesCard({ isSavedMovies, card, сlickButton, }) {
  const [isButtonLike, setButtonLike] = useState(false); // работа с лайком перенести в card.like

  function handleClick() {
  //  console.log('кнопка в карточке:', card);
    сlickButton({card, setButtonLike});
  }
  useEffect(() => {
    console.log('поставили лайк:', card.like);
  }, [!!card.like]);


  return (
    <li id={`card-list${card.id}`} className="card">
      <div className="card__wrapp">
        <div className="card__description">
          <h1 className="card__title">{card.nameRU}</h1>
          <p className="card__duration">{card.duration}</p>
        </div>

        <button
          className={`card__button ${isButtonLike ? "card__button_like " : ""} 
                ${isSavedMovies ? "card__button_delete" : ""}`}
          onClick={handleClick}
        ></button>
      </div>
      <img src={cardImageUrl+card.image.url} alt="" className="card__poster" />
    </li>
  );
}

export default MoviesCard;
