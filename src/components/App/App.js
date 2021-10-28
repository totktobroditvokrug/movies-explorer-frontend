import React from 'react';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound"
import Login from '../Login/Login';
import Register from '../Register/Register';
import { Route, useHistory, Switch, Redirect } from 'react-router-dom';

import './App.css';

const email = 'nnnnnnn@nj.jhc';

function App() {
  return (
<div>
  <Switch>
    <Route exact path='/'>
      <Header
        email={email}
      />
      <Main>
      </Main>
      <Footer/>
    </Route>
    <Route path='/not-registered'>
      <Header
        email={email}
      />
      <Main>
      </Main>
      <Footer/>
    </Route>
    <Route path='/movies'>
      <Header
        email={email}
      />
      <p>страница поиска фильмов</p>
      <Footer/>             
    </Route>
    <Route path='/saved-movies'>
      <Header
        email={email}
      />
      <p>страница сохраненных фильмов</p>
      <Footer/>       
    </Route>
    <Route path='/signup'>
      <Register/>
    </Route>
    <Route path='/signin'>
      <Login/>
    </Route>
    <Route path='/profile'>
      <Header
        email={email}
      />
      <Profile email={email}></Profile>
    </Route>
    <Route path="*">
       <NotFound/>
    </Route>
  </Switch>
    {/*
  <Main/>
  
 
  <Register/> */
  }

</div>
  );
}

export default App;
