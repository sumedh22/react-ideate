import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { doRegister } from "../state/action";

const Register = props => {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const inputChangeHandler = field => e => {
    setCreds({ ...creds, [field]: e.target.value });
  };
  return (
    <div>
      <h1>Register</h1>
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
      <a href="#" onClick={e => dispatch(doRegister(creds))}>
        Register
      </a>
    </div>
  );
};

export default Register;
