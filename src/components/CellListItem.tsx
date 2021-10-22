import "./CellListItem.css";

import { Fragment } from "react";
import { Cell } from "../state";
import ActionBar from "./ActionBar";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  const child =
    cell.type === "code" ? (
      <Fragment>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </Fragment>
    ) : (
      <Fragment>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </Fragment>
    );

  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
