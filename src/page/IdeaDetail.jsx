import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";
import { getIdea, setRead, resetIdeaDetail } from "../state/action";

import Comment from "../component/Comment";

const IdeaDetail = props => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const idea = useSelector(state => state.detail.idea, shallowEqual);

  useEffect(() => {
    dispatch(resetIdeaDetail());
    dispatch(setRead(id));
    dispatch(getIdea(id));
  }, [id]);

  return (
    <div>
      <h1 className="App-header-text">Idea</h1>
      <h2>{idea.title}</h2>
      <p>{idea.detail}</p>

      <Comment id={id} />
    </div>
  );
};

export default IdeaDetail;