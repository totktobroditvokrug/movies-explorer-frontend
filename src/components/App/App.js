import React from 'react';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
// import Login from './Login';
// import Register from './Register';
import { Route, useHistory, Switch, Redirect } from 'react-router-dom';

import './App.css';

const email = 'nnnnnnn@nj.jhc';

function App() {
  return (
<div>
  <Header
    email={email}
  />
  <Switch>
    <Route exact path='/'>
      <Main>
      </Main>
    </Route>
    <Route path='/not-registered'>
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
    <Route path='/profile'>
      <Profile email={email}></Profile>
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
