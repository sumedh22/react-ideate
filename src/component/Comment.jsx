import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { postComment } from "../state/action";
const Comment = props => {
  const [comment, setComment] = useState("");
  const data = useSelector(state => state.detail.comment, shallowEqual);
  const user = useSelector(state => state.user, shallowEqual);
  const dispatch = useDispatch();
  return (
    <div>
      <h3 className="App-header-text">Comments</h3>
      <ul>
        {data.map((comment, idx) => (
          <li key={idx}>
            <div className="App-comment">
              <p>{comment.comment}</p>
              <p>{comment.claps}</p>
            </div>
          </li>
        ))}
      </ul>
      <textarea rows="5" placeholder="Enter a comment" className="App-comment-area" value={comment} onChange={e => setComment(e.target.value)} />
      <a href="#" onClick={e => dispatch(postComment(props.id, comment, user))}>
        Post
      </a>
    </div>
  );
};

export default Comment;
