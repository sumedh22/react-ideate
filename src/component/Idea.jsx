import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clap } from "../state/action";
const Idea = props => {
  const dispatch = useDispatch();
  const trim = (text, minLength=50) => text.length < minLength ? text : `${text.substring(0,minLength)}...`
  return (
    <div className="App-idea">
      <Link
        className="App-title App-header-text"
        to={`/idea-detail/${props.id}`}
      >
        {trim(props.title)}
      </Link>
      <p>{trim(props.detail,100)}</p>
      <a
        style={{
          color: "hotpink",
          fontWeight: 700,
          fontSize: "smaller"
        }}
        title="Clap!"
        onClick={e => dispatch(clap(props))}
      >
        {props.claps || 'No'} Claps
      </a>
    </div>
  );
};

export default Idea;
