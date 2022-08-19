import { IMaze } from './maze';

export const MOCK_MAZES: IMaze[] = [
  {
    id: 12,
    uploadDate: new Date(2022, 7, 18, 15, 20, 12).toLocaleString(),
    graph: [
      ['S', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
      ['O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
      ['O', 'X', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O'],
      ['X', 'X', 'X', 'X', 'O', 'X', 'O', 'X', 'X', 'O'],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'X', 'O'],
      ['O', 'X', 'X', 'O', 'X', 'X', 'X', 'X', 'X', 'O'],
      ['O', 'O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'E'],
    ],
    start: [0, 0],
    end: [6, 9],
  },
  {
    id: 13,
    uploadDate: new Date(2022, 7, 18, 17, 23, 42).toLocaleString(),
    graph: [
      ['S', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
      ['O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
      ['O', 'X', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O'],
      ['X', 'X', 'X', 'X', 'O', 'X', 'O', 'X', 'X', 'O'],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'X', 'O'],
      ['O', 'X', 'X', 'O', 'X', 'X', 'X', 'X', 'X', 'O'],
      ['O', 'O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'E'],
    ],
    start: [0, 0],
    end: [6, 9],
  },
];
