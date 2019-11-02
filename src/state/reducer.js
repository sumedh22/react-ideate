import ACTIONS from "./actionType";

const defaultState = {
  search: { results: [], text: "" },
  detail: { idea: {}, comment: [] },
  create: { submitting: false, success: false },
  user: { loggedIn: false },
  night: false,
  tags: [],
  newIdea: { tags: [], title: "", detail: "", reads: 1 }
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.GET_RESULTS:
      return {
        ...state,
        search: {
          results: [...action.payload.result],
          text: action.payload.text
        }
      };
    case ACTIONS.GET_IDEA:
      return {
        ...state,
        detail: { idea: action.payload.idea, comment: action.payload.comment }
      };
    case ACTIONS.PROCESS_SUBMITTING_IDEA:
      return { ...state, create: { ...state.create, submitting: true } };
    case ACTIONS.FAILED_TO_SUBMIT_IDEA:
      return { ...state, create: { success: false, submitting: true } };
    case ACTIONS.SUBMISSION_COMPLETE:
      return { ...state, create: { success: true, submitting: false } };
    case ACTIONS.LOGIN:
      return { ...state, user: { ...action.payload, loggedIn: true } };
    case ACTIONS.LOGOUT:
      return { ...state, user: { loggedIn: false } };
    case ACTIONS.REGISTER:
      return { ...state, user: { ...action.payload, loggedIn: true } };
    case ACTIONS.SET_MODE:
      return { ...state, night: action.payload };
    case ACTIONS.POST_COMMENT:
      return {
        ...state,
        detail: {
          ...state.detail,
          comment: [...state.detail.comment, action.payload]
        }
      };
    case ACTIONS.GET_TAGS:
      return { ...state, tags: action.payload };
    case ACTIONS.DRAFT_IDEA:
      return { ...state, newIdea: { ...state.newIdea, ...action.payload } };
    case ACTIONS.RESET_IDEA_DETAIL:
      return { ...state, detail: defaultState.detail };
    default:
      return state;
  }
};

export default reducer;
