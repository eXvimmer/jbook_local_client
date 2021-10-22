import { combineReducers } from "redux";
import cellsReducer from "./cellsReducer";

const reducers = combineReducers({
  cells: cellsReducer,
});

export default reducers;

// the required type to use in useSelector hooks (in react-redux)
/** Redux Store */
export type RootState = ReturnType<typeof reducers>;
