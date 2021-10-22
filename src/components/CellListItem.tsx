import { FC } from "react";
import { Cell } from "../state";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: FC<CellListItemProps> = ({ cell }) => {
  const child = cell.type === "code" ? <CodeCell /> : <TextEditor />;

  return <div>{child}</div>;
};

export default CellListItem;
