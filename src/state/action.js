import ACTIONS from "./actionType";
import {
  idea,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  tag
} from "../service/api";
const createAction = (type, payload) => {
  console.log({ type, payload });
  return { type, payload };
};
export const getResults = searchText => dispatch => {
  if (!searchText) {
    idea.orderBy("reads", "desc").onSnapshot(snapshot => {
      const res = [];
      snapshot.forEach(d => {
        res.push({ id: d.id, ...d.data() });
      });
      dispatch(
        createAction(ACTIONS.GET_RESULTS, {
          result: res,
          text: searchText
        })
      );
    });
  }
};
export const getIdea = id => async dispatch => {
  const res = await idea.doc(id).get();
  const commentSnapshot = await idea
    .doc(id)
    .collection("comment")
    .get();
  let comment = [];
  commentSnapshot.forEach(d => {
    comment.push({ id: d.id, ...d.data() });
  });
  dispatch(
    createAction(ACTIONS.GET_IDEA, {
      idea: { id, ...res.data() },
      comment: comment
    })
  );
};
export const createIdea = newIdea => async dispatch => {
  dispatch(createAction(ACTIONS.PROCESS_SUBMITTING_IDEA, {}));
  try {
    const res = await idea.doc().set(newIdea);
    dispatch(createAction(ACTIONS.SUBMISSION_COMPLETE, {}));
  } catch (e) {
    dispatch(createAction(ACTIONS.FAILED_TO_SUBMIT_IDEA, {}));
  }
};

export const doLogin = ({ username, password }) => async dispatch => {
  try {
    const res = await signInWithEmailAndPassword(username, password);
    dispatch(
      createAction(ACTIONS.LOGIN, {
        email: res.user.email,
        photoUrl: res.user.photoUrl,
        displayName: res.user.displayName
      })
    );
  } catch (err) {
    console.error(err);
  }
};
export const doLogout = _ => async dispatch => {
  try {
    await logout();
    dispatch(createAction(ACTIONS.LOGOUT, {}));
  } catch (err) {
    console.error(err);
  }
};
export const doRegister = ({ username, password }) => async dispatch => {
  try {
    const res = await registerWithEmailAndPassword(username, password);
    dispatch(
      createAction(ACTIONS.REGISTER, {
        email: res.user.email,
        photoUrl: res.user.photoUrl,
        displayName: res.user.displayName
      })
    );
  } catch (err) {
    console.error(err);
  }
};

export const setMode = night => dispatch => {
  dispatch(createAction(ACTIONS.SET_MODE, night));
};

export const postComment = (ideaId, comment, user) => async dispatch => {
  try {
    await idea
      .doc(ideaId)
      .collection("comment")
      .doc()
      .set({
        comment,
        postedBy: user.displayName
      });
    dispatch(
      createAction(ACTIONS.POST_COMMENT, {
        comment,
        postedBy: user.displayName
      })
    );
  } catch (err) {
    console.error(err);
  }
};

export const getTags = _ => async dispatch => {
  const res = await tag.get();
  const tags = [];
  res.forEach(d => {
    tags.push(d.data());
  });
  dispatch(createAction(ACTIONS.GET_TAGS, tags));
};

export const draftIdea = idea => dispatch => {
  dispatch(createAction(ACTIONS.DRAFT_IDEA, idea));
};
export const setRead = id => async dispatch => {
  const res = await idea.doc(id).get();
  await idea.doc(id).set({ ...res.data(), reads: (res.data().reads || 1) + 1 });
  dispatch(createAction(ACTIONS.SET_READ, {}));
};

export const resetIdeaDetail = _ => dispatch => {
  dispatch(createAction(ACTIONS.RESET_IDEA_DETAIL, {}));
};