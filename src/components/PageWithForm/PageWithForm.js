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
  clickLogin
}) {
  return (
      <div className={`body page__content page_type_${name}`}>
            <Link className="form__landing" to=''>
                <Landing></Landing>
            </Link>
        <form
          className='page__form'
          name={name}
          noValidate
        >

          <h2 className='form__title'>{title}</h2>
          {children}
          <Link
            className="page__button"
            onClick={clickLogin}
            to='/'
          >
            {buttonText}
          </Link>
        </form>
        <div className="form__footer">
          <p className="form__edit">{linkAbout}</p>
          <p className="form__link" >{linkText}</p>
        </div>
      </div>
  );
}

export default PageWithForm;
