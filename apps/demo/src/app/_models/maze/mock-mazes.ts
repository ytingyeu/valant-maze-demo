import { IMaze } from './maze';

// const graph1 = {
//   graph: [
//     ['S', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
//     ['O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
//     ['O', 'X', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O'],
//     ['X', 'X', 'X', 'X', 'O', 'X', 'O', 'X', 'X', 'O'],
//     ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'X', 'O'],
//     ['O', 'X', 'X', 'O', 'X', 'X', 'X', 'X', 'X', 'O'],
//     ['O', 'O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'E'],
//   ],
// };

// const graph2 = {
//   graph: [
//     ['S', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
//     ['O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
//     ['O', 'X', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O'],
//     ['X', 'X', 'X', 'X', 'O', 'X', 'O', 'X', 'X', 'O'],
//     ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'X', 'O'],
//     ['O', 'X', 'X', 'X', 'X', 'X', 'O', 'X', 'X', 'X'],
//     ['X', 'X', 'E', 'O', 'O', 'O', 'O', 'X', 'X', 'X'],
//   ],
// };

export const MOCK_MAZES: IMaze[] = [
  {
    id: 12,
    uploadDate: new Date(2022, 7, 18, 15, 20, 12).toLocaleString(),
    // graphString: JSON.stringify(graph1),
    graphString: 'SOXXXXXXXX#OOOXXXXXXX#OXOOOXOOOO#XXXXOXOXXO#OOOOOOOXXO#OXXOXXXXXO#OOOOXXXXXE#',
    start: { row: 0, col: 0 },
    exit: { row: 6, col: 9 },
  },
  {
    id: 13,
    uploadDate: new Date(2022, 7, 18, 17, 23, 42).toLocaleString(),
    // graphString: JSON.stringify(graph2),
    graphString: 'SOXXXXXXXX#OOOXXXXXXX#OXOOOXOOOO#XXXXOXOXXO#OOOOOOOXXO#OXXXXXOXXX#XXEOOOOXXX#',
    start: { row: 0, col: 0 },
    exit: { row: 6, col: 2 },
  },
];
