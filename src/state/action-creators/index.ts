import { ActionCreator, Dispatch } from "redux";
import bundle from "../../bundler";
import { ActionType } from "../action-types";
import {
  Action,
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

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        // bundle: result,
        bundle: {
          loading: false,
          code: result.code,
          err: result.err,
        },
      },
    });
  };
};
