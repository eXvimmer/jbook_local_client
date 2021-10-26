import { combineReducers } from "redux";
import cellsReducer from "./cellsReducer";
import bundlesReducer from "./bundlesReducer";

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

export default reducers;

// the required type to use in useSelector hooks (in react-redux)
/** Redux Store */
export type RootState = ReturnType<typeof reducers>;
