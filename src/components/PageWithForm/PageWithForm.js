import React from "react";
import { Link } from "react-router-dom";
import "./PageWithForm.css";
import Landing from "../Landing/Landing";
import "../Form/Form.css";

function PageWithForm({
  name,
  title,
  buttonText,
  linkAbout,
  linkText,
  link,
  children,
  onSubmit,
  isSending,
  isValid,
  errStatus
}) {
  return (
    <div className={`body page__content page_type_${name}`}>
      <Link className="form__landing" to="">
        <Landing></Landing>
      </Link>
      <form className="page__form" name={name} onSubmit={onSubmit} noValidate >
        <h2 className="form__title">{title}</h2>
        {children}
        { !!errStatus && errStatus!=='' && <p className="form__error form__error_server">{errStatus}</p>}
        <button
          type="submit"
          className={`page__button ${
            (!isValid || isSending) && "page__button_disabled"
          }`}
          disabled={isSending || !isValid}
        >
          {isSending ? "Отправляем..." : buttonText}
        </button>
      </form>
      <div className="form__footer">
        <p className="form__edit">{linkAbout}</p>
        <Link className="form__link" to={link}>
          {linkText}{" "}
        </Link>
      </div>
    </div>
  );
}

export default PageWithForm;
