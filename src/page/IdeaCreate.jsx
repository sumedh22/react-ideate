import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createIdea, draftIdea } from "../state/action";
import Tag from "../component/Tag";
const IdeaCreate = props => {
  const { submitting, success } = useSelector(
    state => state.create,
    shallowEqual
  );
  useEffect(
    _ => {
      console.log(submitting, success);
    },
    [submitting, success]
  );
  const dispatch = useDispatch();

  const idea = useSelector(
    state => state.newIdea,
    shallowEqual
  );

  const inputHandler = field => e => {
    console.log(field)
    dispatch(draftIdea({ ...idea, [field]: e.target.value }));
  };

  return (
    <div>
      <Tag />
      {submitting && <h2>Submitting!</h2>}
      {!submitting && success && <h2>Success!</h2>}
      <h1 className="App-header-text">Idea Create</h1>
      <input
        value={idea.title}
        className="App-comment-area"
        onChange={inputHandler("title")}
      />
      <textarea
        value={idea.detail}
        className="App-comment-area"
        rows={10}
        onChange={inputHandler("detail")}
      />
      <a href="#" onClick={e => dispatch(createIdea({...idea, reads:1}))}>
        CREATE
      </a>
    </div>
  );
};

export default IdeaCreate;
