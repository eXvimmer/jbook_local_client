import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { ActionType } from "./action-types";
import reducers from "./reducers";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

// TODO: Remove these dispatches
store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "code",
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "text",
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "code",
  },
});
