import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createIdea, draftIdea } from "../state/action";
import Tag from "../component/Tag";
const IdeaCreate = props => {
  const dispatch = useDispatch();

  const idea = useSelector(state => state.newIdea, shallowEqual);

  const inputHandler = field => e => {
    dispatch(draftIdea({ ...idea, [field]: e.target.value }));
  };

  return (
    <div>
      <Tag />
      <h1 className="App-header-text">Idea Create</h1>
      <input
        placeholder="Title..."
        value={idea.title}
        className="App-comment-area"
        onChange={inputHandler("title")}
      />
      <textarea
        placeholder="Elaborate..."
        value={idea.detail}
        className="App-comment-area"
        rows={10}
        onChange={inputHandler("detail")}
      />
      <a href="#" onClick={e => dispatch(createIdea({ ...idea, reads: 1 }))}>
        PUBLISH
      </a>
      {/* {" | "}
      <a href="#" onClick={e => dispatch(notify({message:'test message',messageType:'success',actionText:'ok!'}))}>
        SAVE AS DRAFT
      </a> */}
    </div>
  );
};

export default IdeaCreate;
