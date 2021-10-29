import React from "react";
import '../MoviesCard/MoviesCard.css';

function MoviesCard({
  card,
  link,
  button
}) {
  return (
    <li className='card'>
        <div className="card__wrapp">
            <h1 className="card__title">{card.nameRU}</h1>
            <p className="card__duration">{card.duration}</p>
            <button className="card__button"></button>
        </div>
        <img src={card.thumbnail} alt="" className="card__poster" />
    </li>
  );
}

export default MoviesCard;