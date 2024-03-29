import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getTags, draftIdea, toggleUserSelectTag } from "../state/action";

const Tag = props => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.tags, shallowEqual);
  const tags = useSelector(state => state.newIdea.tags, shallowEqual);

  const idea = useSelector(state => state.newIdea, shallowEqual);
  const [dataWithRegex, setDataWithRegex] = useState([]);
  useEffect(_ => {
    dispatch(getTags());
  }, []);

  useEffect(
    _ => {
      const tagsWithRegex = [];
      data.forEach(tag => {
        tag.for.forEach(t => {
          tagsWithRegex.push({ tag: tag.value, regex: new RegExp(t, "gi") });
        });
      });
      setDataWithRegex(tagsWithRegex);
    },
    [data]
  );

  useEffect(
    _ => {
      if (dataWithRegex.length) {
        let s = [];
        dataWithRegex.forEach(reg => {
          if ((idea.title.match(reg.regex) || []).length) {
            s.push(reg.tag);
          }
          if ((idea.detail.match(reg.regex) || []).length) {
            s.push(reg.tag);
          }
        });
        dispatch(draftIdea({ ...idea, tags: Array.from(new Set(s)) }));
      }
    },
    [idea.title, idea.detail]
  );
  return (
    <div>
      {data.map(t => (
        <a
          onClick={e => dispatch(toggleUserSelectTag(t.value))}
          className={
            tags.includes(t.value) ? "App-tag-selected" : "App-tag-unselected"
          }
          key={t.value}
        >
          <span>{t.name}</span>
        </a>
      ))}
    </div>
  );
};

export default Tag;
