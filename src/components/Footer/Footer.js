import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className="body footer">
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__wrapp">
                <p className="footer__copyright">©2021. Енот</p>
                <nav>
                    <ul className="footer__links">
                        <li>
                            <a href="https://practicum.yandex.ru"
                            target="_blank" rel="noreferrer" className="footer__link">Яндекс.Практикум</a>
                        </li>
                        <li>
                            <a href="https://github.com/totktobroditvokrug"
                            target="_blank" rel="noreferrer" className="footer__link">Github</a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/" 
                            target="_blank" rel="noreferrer" className="footer__link">Facebook</a>
                        </li>
                    </ul>
                </nav>
            </div>            
        </div>        
    );
}    

export default Footer;