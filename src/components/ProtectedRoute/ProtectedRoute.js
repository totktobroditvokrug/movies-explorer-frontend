import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({path, children, loggedIn}) => {
    return (
      <Route path={path} exact>
        {
          loggedIn ? children : <Redirect to="/" />
        }
      </Route>

    );
  };
  
  export default ProtectedRoute;