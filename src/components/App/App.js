import React from 'react';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
// import Login from './Login';
// import Register from './Register';
import { Route, useHistory, Switch, Redirect } from 'react-router-dom';

import './App.css';

function App() {
  return (
<div>
  <Header
    them={"header__them_dark"}
    email={'nnnnnnn@nj.jhc'}
  />
  <Switch>
    <Route exact path='/'>
      <Main>
      </Main>
    </Route>
    <Route path='/movies'>
      <p>страница поиска фильмов</p>              
    </Route>
    <Route path='/saved-movies'>
      <p>страница сохраненных фильмов</p>        
    </Route>
    <Route path='/signup'>
      <p>страница авторизации</p>
    </Route>
    <Route path='/signin'>
      <p>страница регистрации</p>
    </Route>
  </Switch>
  <Footer/>
  {/*
  <Main/>
  
  <Login/>
  <Register/> */
  }

</div>
  );
}

export default App;
