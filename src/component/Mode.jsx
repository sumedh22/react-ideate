import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setMode } from "../state/action";

const DayNightMode = props => {
  const night = useSelector(state => state.night, shallowEqual);

  useEffect(
    _ => {
        document.documentElement.style.setProperty("--background", night? 'black': 'white');
        document.documentElement.style.setProperty("--color", night? 'white': '');
        document.documentElement.style.setProperty("--header-text", night? 'navajowhite': '');
        document.documentElement.style.setProperty("--header-link", night? '#7fffd4fa': '');
        document.documentElement.style.setProperty("--button-color", night? 'hotpink': '');
    },
    [night]
  );

  const dispatch = useDispatch();
  return (
    <a onClick={e => dispatch(setMode(!night))} href="#">
      {night ? "day" : "night"}
    </a>
  );
};

export default DayNightMode;
