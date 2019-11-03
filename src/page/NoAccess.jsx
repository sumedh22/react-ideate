import React, { useState } from "react";

import Login from "../component/Login";
import Register from "../component/Register";
const NoAccess = props => {
  const [login, setLogin] = useState(true);

  return (
    <div className="App-no-access-container">
      <h1 className="App-header-text">Seems like you have not logged in!</h1>
      <a href="#" onClick={e => setLogin(true)}>
        Log In
      </a>
      {" | "}
      <a href="#" onClick={e => setLogin(false)}>
        Register
      </a>
      {login && <Login />}
      {!login && <Register />}
    </div>
  );
};

export default NoAccess;
