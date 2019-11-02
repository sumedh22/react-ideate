import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getResults } from "../state/action";
import Idea from "../component/Idea";
const Landing = props => {
  const [searchText, setSearchText] = useState("");
  const searchResult = useSelector(state => state.search.results, shallowEqual);
  const dispatch = useDispatch();
  const searchInput = useRef();
  useEffect(
    _ => {
      dispatch(getResults(searchText));
      searchInput.current.focus();
    },
    [searchText]
  );

  const textChangeHandler = e => {
    setSearchText(e.target.value);
  };
  const filterResults = i => {
    return (
      i.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      i.detail.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      i.tags.includes(searchText.toLowerCase())
    );
  };
  return (
    <div>
      <h1 className="App-header-text">Ideate</h1>
      <input
        ref={searchInput}
        className="App-search"
        value={searchText}
        onChange={textChangeHandler}
        placeholder="Start typing..."
      />
      <ul>
        {searchResult.filter(filterResults).map(res => (
          <li key={res.id}>
            <Idea {...res} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Landing;
