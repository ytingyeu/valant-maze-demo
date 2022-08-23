import { IMaze, IMovement, INewMaze } from './maze';

const graph1 = [
  ['S', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['O', 'X', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O'],
  ['X', 'X', 'X', 'X', 'O', 'X', 'O', 'X', 'X', 'O'],
  ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'X', 'O'],
  ['O', 'X', 'X', 'O', 'X', 'X', 'X', 'X', 'X', 'O'],
  ['O', 'O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'E'],
];

const graph2 = [
  ['S', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['O', 'X', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O'],
  ['X', 'X', 'X', 'X', 'O', 'X', 'O', 'X', 'X', 'O'],
  ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'X', 'O'],
  ['O', 'X', 'X', 'X', 'X', 'X', 'O', 'X', 'X', 'X'],
  ['X', 'X', 'E', 'O', 'O', 'O', 'O', 'X', 'X', 'X'],
];

export const MOCK_MAZES: IMaze[] = [
  {
    id: 12,
    uploadDate: new Date(2022, 7, 18, 15, 20, 12),
    // graphString: JSON.stringify(graph1),
    // graphString: 'SOXXXXXXXX#OOOXXXXXXX#OXOOOXOOOO#XXXXOXOXXO#OOOOOOOXXO#OXXOXXXXXO#OOOOXXXXXE#',
    graph: graph1,
    start: { row: 0, col: 0 },
    exit: { row: 6, col: 9 },
  },
  {
    id: 13,
    uploadDate: new Date(2022, 7, 18, 17, 23, 42),
    // graphString: JSON.stringify(graph2),
    // graphString: 'SOXXXXXXXX#OOOXXXXXXX#OXOOOXOOOO#XXXXOXOXXO#OOOOOOOXXO#OXXXXXOXXX#XXEOOOOXXX#',
    graph: graph2,
    start: { row: 0, col: 0 },
    exit: { row: 6, col: 2 },
  },
];

export const NEW_MAZE_REQ: INewMaze = {
  graphString: 'SOXXXXXXXX#OOOXXXXXXX#OXOOOXOOOO#XXXXOXOXXO#OOOOOOOXXO#OXXOXXXXXO#OOOOXXXXXE#',
  start: { row: 0, col: 0 },
  exit: { row: 6, col: 9 },
};

export const VALID_MOVEMENTS: IMovement[] = [
  { name: 'Up', direction: { row: -1, col: 0 } },
  { name: 'Down', direction: { row: 1, col: 0 } },
  { name: 'Left', direction: { row: 0, col: -1 } },
  { name: 'Right', direction: { row: 0, col: 1 } },
];
