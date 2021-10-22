import { ActionCreator } from "redux";
import { ActionType } from "../action-types";
import {
  DeleteCellAction,
  InsertCellBeforeAction,
  MoveCellAction,
  UpdateCellAction,
} from "../actions";
import { CellTypes } from "../cell";

export const updateCell: ActionCreator<UpdateCellAction> = (
  id: string,
  content: string
) => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell: ActionCreator<DeleteCellAction> = (id: string) => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

// TODO: change up | down to a type
export const moveCell: ActionCreator<MoveCellAction> = (
  id: string,
  direction: "up" | "down"
) => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellBefore: ActionCreator<InsertCellBeforeAction> = (
  id: string,
  cellType: CellTypes
) => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType,
    },
  };
};
