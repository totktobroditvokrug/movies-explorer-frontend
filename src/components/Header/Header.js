import React, { useState } from 'react';
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";
import './Header.css';
import Landing from '../Landing/Landing';

import logo_account from '../../images/logo_account.svg';

function Header({email}) {

    const [isMenuOpen, setMenuOpen] = useState(false);

    function toggleMenu() { // добавить setMenuOpen(false) при увеличении размера экрана
      setMenuOpen(!isMenuOpen);
    }

    const isMain = useRouteMatch({path: "/", exact: true});
    const isRegistered = useRouteMatch({path: "/not-registered", exact: true});

    return (
        <div>
            <div className={`${isMenuOpen ? "header__overlay" : ""}`}></div>
            <header
                className={
                    `body header 
                    ${ (isMain || isRegistered) ? "header__them_dark" : "header__them_light"}`
                }>
                <Link to=''>
                    <Landing></Landing>
                </Link>
                <div className={`${isMenuOpen ? "header__open" : "header__close"}`}>
                        <Switch>
                            <Route exact path='/'>
                                    <div className={`header__wrapp ${isMenuOpen ? "header__wrapp_on" : ""}`}>
                                        <Link className="link link__movies" to='movies'>Фильмы</Link>
                                        <Link className="link link__movies" to='saved-movies'>Сохраненные фильмы</Link>
                                    </div>
                                    <div className={`account ${isMenuOpen ? "account_on" : ""}`}>
                                        <img className="account__logo" src={logo_account} alt="Пользователь"/>
                                        <Link to='/not-registered'>
                                        <p>{email}</p>
                                        </Link>
                                    </div>
                                    <button
                                        className={`${isMenuOpen ? "header__menu header__menu_close" : "header__menu"}`}
                                        type='button'
                                        aria-label='меню'
                                        onClick={toggleMenu}
                                    >
                                    </button>
                            </Route>
                            <Route path='/not-registered'>
                                    <div className="header__registration">
                                        <Link className="registration" to='/signin'>Регистрация</Link>
                                        <Link className="button__login" type="button" to='/'>Войти</Link>
                                    </div>
                            </Route>
                            <Route path='/movies'>
                                    <div className={`header__wrapp ${isMenuOpen ? "header__wrapp_on" : ""}`}>
                                        <Link className={`${isMenuOpen ? "link link__movies" : "link_off"}`} to=''>Главная</Link>
                                        <p className="link link__movies link__movies_active">Фильмы</p>
                                        <Link className="link link__movies" to='saved-movies'>Сохраненные фильмы</Link>
                                    </div>
                                    <div className={`account ${isMenuOpen ? "account_on" : ""}`}>
                                        <img className="account__logo" src={logo_account} alt="Пользователь"/>
                                        <p>{email}</p>
                                    </div>
                                    <button
                                        className={`${isMenuOpen ? "header__menu header__menu_close" : "header__menu"}`}
                                        type='button'
                                        aria-label='меню'
                                        onClick={toggleMenu}
                                    >
                                    </button>
                            </Route>
                            <Route path='/saved-movies'>
                                    <div className={`header__wrapp ${isMenuOpen ? "header__wrapp_on" : ""}`}>
                                        <Link className={`${isMenuOpen ? "link link__movies" : "link_off"}`} to=''>Главная</Link>
                                        <Link className="link link__movies" to='movies'>Фильмы</Link>
                                        <p className="link link__movies link__movies_active">Сохраненные фильмы</p>
                                    </div>
                                    <div className={`account ${isMenuOpen ? "account_on" : ""}`}>
                                        <img className="account__logo" src={logo_account} alt="Пользователь"/>
                                        <p>{email}</p>
                                    </div>
                                    <button
                                        className={`${isMenuOpen ? "header__menu header__menu_close" : "header__menu"}`}
                                        type='button'
                                        aria-label='меню'
                                        onClick={toggleMenu}
                                    >
                                    </button>
                            </Route>
                            <Route path='/profile'>
                                    <div className={`header__wrapp ${isMenuOpen ? "header__wrapp_on" : ""}`}>
                                        <Link className="link link__movies" to=''>Главная</Link>
                                        <Link className="link link__movies" to='movies'>Фильмы</Link>
                                        <p className="link link__movies">Сохраненные фильмы</p>
                                    </div>
                                    <div className={`account ${isMenuOpen ? "account_on" : ""}`}>
                                        <img className="account__logo" src={logo_account} alt="Пользователь"/>
                                        <p>{email}</p>
                                    </div>
                                    <button
                                        className={`${isMenuOpen ? "header__menu header__menu_close" : "header__menu"}`}
                                        type='button'
                                        aria-label='меню'
                                        onClick={toggleMenu}
                                    >
                                    </button>
                            </Route>
                            <Route path='/signup'>
                                <Link className="button__login" type="button" to='signin'>
                                    Войти
                                </Link>
                            </Route>
                            <Route path='/signin'>
                                <Link className='registration' to='signup'>
                                    Регистрация
                                </Link>
                            </Route>
                            <Route path="*">
                            </Route>
                    </Switch>  
                </div>
            </header>
        </div>

    );
}    

export default Header;