import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <div className="body project">
      <h1 className="main__title">О проекте</h1>
      <div className="project__container1">
        <h2 className="project__subtitle project__subtitle_box1">
          Дипломный проект включал 5 этапов
        </h2>
        <h2 className="project__subtitle project__subtitle_box2">
          На выполнение диплома ушло 5 недель
        </h2>
        <p className="project__text project__text_box1">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <p className="project__text project__text_box2">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="project__container2">
        <h2 className="project__week project__week_box1">1 неделя</h2>
        <h2 className="project__week project__week_box2">4 недели</h2>
        <p className="project__subj project__subj_box1">Back-end</p>
        <p className="project__subj project__subj_box2">Front-end</p>
      </div>
    </div>
  );
}

export default AboutProject;
