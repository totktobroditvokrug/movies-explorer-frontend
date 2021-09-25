import React from 'react';
import './Hamburger.css';
import menu from '../../images/Icon_menu_hamburger.svg';

function Hamburger() {
    return (
        <img className="icon__menu" src={menu} alt="Логотип"/>
   
    );
}    

export default Hamburger;