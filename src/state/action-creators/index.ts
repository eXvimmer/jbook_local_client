import { ActionCreator } from "redux";
import { ActionType } from "../action-types";
import {
  DeleteCellAction,
  Direction,
  InsertCellAfterAction,
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

export const moveCell: ActionCreator<MoveCellAction> = (
  id: string,
  direction: Direction
) => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter: ActionCreator<InsertCellAfterAction> = (
  /** id of the next cell */
  id: string | null,
  cellType: CellTypes
) => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};
