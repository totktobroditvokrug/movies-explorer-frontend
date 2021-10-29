import React from "react";
import '../Movies/Movies.css';
import {initialCards} from '../../utils/constants';
import MoviesCard from "../MoviesCard/MoviesCard";

function Movies({

}) {
  return (
    <div className='body movies'>
        {
                    <ul className='movies__list'>
                    {initialCards.map((card) => (
                      <MoviesCard
                        key={card.movieId}
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