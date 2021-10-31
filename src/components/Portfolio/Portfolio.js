import React from "react";
import "./Portfolio.css";
import porfolio_link from "../../images/portfolio_link.svg";

function Portfolio() {
  return (
    <div className="body portfolio">
      <h1 className="portfolio__title">Портфолио</h1>
      <ul className="portfolio__links">
        <li className="portfolio__site">
          <p className="portfolio__text">Статичный сайт</p>
          <a
            href="https://totktobroditvokrug.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={porfolio_link} alt="стрелка" className="porfolio__link" />
          </a>
        </li>
        <li className="portfolio__site">
          <p className="portfolio__text">Адаптивный сайт</p>
          <a
            href="https://github.com/totktobroditvokrug"
            target="_blank"
            rel="noreferrer"
          >
            <img src={porfolio_link} alt="стрелка" className="porfolio__link" />
          </a>
        </li>
        <li className="portfolio__site">
          <p className="portfolio__text">Одностраничное приложение</p>
          <a
            href="https://nekto.lukas.nomoredomains.club/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={porfolio_link} alt="стрелка" className="porfolio__link" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
