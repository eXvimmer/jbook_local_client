import { ActionType } from "../action-types";
import { CellTypes } from "../cell";

export type Direction = "up" | "down";

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  /** where to move the cell */
  payload: {
    /** id of the cell that should be moved */
    id: string;
    /** where to move the cell */
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  /** id of the cell that should be deleted */
  payload: string;
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    /** id of the cell that should be updated */
    id: string;
    /** content of the cell that should be updated */
    content: string;
  };
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    /** cell id that the new cell should be inserted After */
    id: string | null;
    /** new cell type */
    type: CellTypes;
  };
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | UpdateCellAction
  | InsertCellAfterAction;
