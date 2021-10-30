import "./CellList.css";

import { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import AddCell from "./AddCell";
import CellListItem from "./CellListItem";
import { useActions } from "../hooks/useActions";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );
  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previeousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previeousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
