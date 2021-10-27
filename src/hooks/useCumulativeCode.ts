import { useTypedSelector } from "./useTypedSelector";

export const useCumulativeCode = (cellId: string) => {
  const showFunc = `
    import _React from "react";
    import _ReactDOM from "react-dom";

    var show = (value) => {
      const root = document.getElementById("root");
      if (typeof value === "object") {
        if (value.$$typeof && value.props) {
          _ReactDOM.render(value, root);
        } else {
          root.innerHTML = JSON.stringify(value);
        }
      } else {
        root.innerHTML = value;
      }
    }
  `;

  const showFuncNoOp = `var show = () => {}`; // does nothing

  /** Pick all codes from previous cells and put them in an array*/
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const cumulativeCode = [];

    const orderedCells = order.map((id) => data[id]);

    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoOp);
        }

        cumulativeCode.push(c.content);
      }

      if (c.id === cellId) break;
    }

    return cumulativeCode;
  }).join("\n");
};
