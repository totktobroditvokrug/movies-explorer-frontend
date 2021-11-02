import React, { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Movies from "../Movies/Movies";

const email = "nnnnnnn@nj.jhc";

function App() {
  const [isRegistered, setRegistered] = useState(false);

  function clickLogin() {
    setRegistered(true);
  }
  function clickExit() {
    console.log("выйти из аккаунта", isRegistered);
    setRegistered(false);
  }
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Header email={email} isRegistered={isRegistered} />
          <Main></Main>
          <Footer />
        </Route>
        <Route path="/not-registered">
          <Header email={email} />
          <Main></Main>
          <Footer />
        </Route>
        <Route path="/movies">
          <Header email={email} />
          <Movies name="movies" />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header email={email} />
          <Movies name="saved-movies" />
          <Footer />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login clickLogin={clickLogin} />
        </Route>
        <Route path="/profile">
          <Header email={email} />
          <Profile email={email} clickExit={clickExit}></Profile>
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
