import React from "react";
import { Link } from "react-router-dom";
import './PageWithForm.css';
import Landing from '../Landing/Landing';
import '../Form/Form.css';

function PageWithForm({
  name,
  title,
  buttonText,
  linkAbout,
  linkText,
  link,
  children,
}) {
  return (
      <div className={`body page__content page_type_${name}`}>
            <Link to=''>
                <Landing></Landing>
            </Link>
        <form
          className='page__form'
          name={name}
          noValidate
        >

          <h2 className='form__title'>{title}</h2>
          {children}
          <button
            type='submit'
            className="page__button"
          >
            {buttonText}
          </button>
        </form>
        <div className="form__footer">
          <p className="form__edit">{linkAbout}</p>
          <Link className="form__link" to={link}>{linkText}</Link>
        </div>
      </div>
  );
}

export default PageWithForm;
