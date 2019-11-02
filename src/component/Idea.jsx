import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clap } from "../state/action";
const Idea = props => {
  const dispatch = useDispatch();
  return (
    <div className="App-idea">
      <Link
        className="App-title App-header-text"
        to={`/idea-detail/${props.id}`}
      >
        {props.title}
      </Link>
      <p>{props.detail}</p>
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
