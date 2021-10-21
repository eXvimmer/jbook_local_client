export type CellTypes = "code" | "text";

export interface Cell {
  /** id of the cell */
  id: string;
  /** type of the cell */
  type: CellTypes;
  /** contents of the cell */
  content: string;
}
