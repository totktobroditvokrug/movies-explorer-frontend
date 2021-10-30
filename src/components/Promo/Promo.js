import React from 'react';
import './Promo.css';
import NavTab from '../NavTab/NavTab'
import logo from '../../images/logo_web.svg';

function Promo() {

    return (
        <div className="body promo">
            <div className="promo_wrapp">
                <h1 className="promo_title">Учебный проект студента факультета Веб-разработки.</h1>
                <h2 className="promo_subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</h2>
                <NavTab
                     value={'Узнать больше'}
                ></NavTab>
            </div>
            <img className="promo_logo" src={logo} alt="Логотип"/>   
        </div>        
    );
}    

export default Promo;