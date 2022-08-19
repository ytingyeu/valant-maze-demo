import { IMaze } from './maze';

export const MOCK_MAZES: IMaze[] = [
  {
    id: 12,
    uploadDate: new Date(2022, 7, 18, 15, 20, 12).toLocaleString(),
    graphString: 'SOXXXXXXXX#OOOXXXXXXX#OXOOOXOOOO#XXXXOXOXXO#OOOOOOOXXO#OXXOXXXXXO#OOOOXXXXXE#',
    start: [0, 0],
    end: [6, 9],
  },
  {
    id: 13,
    uploadDate: new Date(2022, 7, 18, 17, 23, 42).toLocaleString(),
    graphString: 'SOXXXXXXXX#OOOXXXXXXX#OXOOOXOOOO#XXXXOXOXXO#OOOOOOOXXO#OXXXXXOXXX#XXEOOOOXXX#',
    start: [0, 0],
    end: [6, 9],
  },
];
