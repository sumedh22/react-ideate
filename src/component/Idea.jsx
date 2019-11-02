import React from "react";
import { Link } from "react-router-dom";
const Idea = props => {
  return (
    <div className="App-idea">
      <Link className="App-title App-header-text" to={`/idea-detail/${props.id}`} >{props.title}</Link>
      <p>{props.detail}</p>
      <p>{props.claps}</p>
    </div>
  );
};

export default Idea;
