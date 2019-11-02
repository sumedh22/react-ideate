import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { doLogin } from "../state/action";
const Login = props => {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const inputChangeHandler = field => e => {
    setCreds({ ...creds, [field]: e.target.value });
  };
  return (
    <div>
      <h1>Login</h1>
      <input
        className="App-comment-area"
        type="text"
        placeholder="Email"
        onChange={inputChangeHandler("username")}
      />
      <input
        className="App-comment-area"
        type="password"
        placeholder="Password"
        onChange={inputChangeHandler("password")}
      />
      <a href="#" onClick={e => dispatch(doLogin(creds))}>
        Login
      </a>
    </div>
  );
};

export default Login;
