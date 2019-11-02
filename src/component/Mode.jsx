import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setMode } from "../state/action";
import '../css/style.css'

const DayNightMode = props => {
  const night = useSelector(state => state.night, shallowEqual);

  useEffect(
    _ => {
        document.documentElement.style.setProperty("--background", night? 'black': 'white');
        document.documentElement.style.setProperty("--color", night? 'white': '');
        document.documentElement.style.setProperty("--header-text", night? 'navajowhite': '#2f96b7');
        document.documentElement.style.setProperty("--header-link", night? '#7fffd4fa': '');
        document.documentElement.style.setProperty("--button-color", night? 'hotpink': '');
    },
    [night]
  );

  const dispatch = useDispatch();
  return (
    <a style={{float:'right'}} onClick={e => dispatch(setMode(!night))} href="#" title={night? 'light mode': 'dark mode'}>
      {night ? <i className="icon-wb_sunny"/> : <i className="icon-nights_stay"/>}
    </a>
  );
};

export default DayNightMode;
