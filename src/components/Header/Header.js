import React from 'react';
import { Route, Link, Switch } from "react-router-dom";
import './Header.css';
import Landing from '../Landing/Landing';
import Hamburger from '../Hamburger/Hamburger'

import logo_account from '../../images/logo_account.svg';
// import { Route, Link, Switch } from "react-router-dom";

function Header({them, email}) {
    return (   
            <Switch>
                <Route exact path='/'>
                    <header className="body header header__them_dark">
                        <Landing></Landing>
                        <div className="account">
                            <img className="account__logo" src={logo_account} alt="Пользователь"/>
                            <p>{email}</p>
                        </div>
                        <Hamburger></Hamburger>
                    </header>
                </Route>
                <Route path='/movies'>
                    <header className="body header header__them_light">
                        <div className="header__wrapp">
                            <Link to=''>
                                <Landing></Landing>
                            </Link>
                            <p className="link link__movies link__movies_active">Фильмы</p>
                            <Link className="link link__movies" to='saved-movies'>Сохраненные фильмы</Link>
                        </div>
                        <div className="account">
                            <img className="account__logo" src={logo_account} alt="Пользователь"/>
                            <p>{email}</p>
                        </div>
                    </header>                
                </Route>
                <Route path='/saved-movies'>
                    <header className="body header header__them_light">
                        <div className="header__wrapp">
                            <Link to=''>
                                <Landing></Landing>
                            </Link>
                            <Link className="link link__movies" to='movies'>Фильмы</Link>
                            <p className="link link__movies link__movies_active">Сохраненные фильмы</p>
                        </div>
                        <div className="account">
                            <img className="account__logo" src={logo_account} alt="Пользователь"/>
                            <p>{email}</p>
                        </div>
                    </header>          
                </Route>
                <Route path='/signup'>
                    <Link to=''>
                            <Landing></Landing>
                        </Link>
                    <Link className="button__login" type="button" to='signin'>
                        Войти
                    </Link>
                </Route>
                <Route path='/signin'>
                    <Link to=''>
                            <Landing></Landing>
                        </Link>
                    <Link className='registration' to='signup'>
                        Регистрация
                    </Link>
                </Route>
           </Switch>
    );
}    

export default Header;