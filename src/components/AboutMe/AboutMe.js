import React from "react";
import "./AboutMe.css";
import me_foto from "../../images/enot.jpg";

function AboutMe() {
  return (
    <div className="body me">
      <h1 className="main__title">Студент</h1>
      <div className="me__container">
        <div className="me__about">
          <a name="profile"></a>
          <h2 className="me__name">Сергей</h2>
          <p className="me__job">Инженер-электронщик, 46 лет</p>
          <p className="me__blablabla">
            Учился в МЭИ на кафедре "Промышленная электроника". С 1997 года
            работаю по специальности. Основная сфера деятельности- силовая
            электроника и электропривод.
          </p>
          <ul className="me__links">
            <li>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="me__link"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://github.com/totktobroditvokrug"
                target="_blank"
                rel="noreferrer"
                className="me__link"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <div className="me__foto">
          <img src={me_foto} alt="фото Енота" className="me__img" />
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
