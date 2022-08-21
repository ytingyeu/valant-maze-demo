export interface IMaze {
  id: number;
  uploadDate: string;
  graphString: string;
  start: { row: number; col: number };
  exit: { row: number; col: number };
}

export interface IMovement {
  name: string;
  direction: {
    row: number;
    col: number;
  };
}

export interface ICell {
  row: number;
  col: number;
}
