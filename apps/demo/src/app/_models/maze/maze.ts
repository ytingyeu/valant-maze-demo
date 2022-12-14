export interface IMaze {
  id: number;
  uploadDate: Date;
  graph: string[][];
  start: { row: number; col: number };
  exit: { row: number; col: number };
}

export interface INewMaze {
  graphString: string;
  start: ICell;
  exit: ICell;
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

export const mazeSymbols = {
  start: 'S',
  current: 'C',
  exit: 'E',
  block: 'X',
  space: 'O',
};

export const mazeDisplayDict = new Map<string, string>([
  [mazeSymbols.start, '🐁'],
  [mazeSymbols.current, '🐁'],
  [mazeSymbols.exit, '🧀'],
  [mazeSymbols.block, '⬛'],
  [mazeSymbols.space, ' '],
]);
