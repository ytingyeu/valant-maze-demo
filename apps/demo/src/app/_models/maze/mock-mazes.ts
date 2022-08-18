import { IMaze } from './maze';

export const MOCK_MAZES: IMaze[] = [
  {
    id: 12,
    uploadDate: new Date(2022, 7, 18, 15, 20, 12).toLocaleString(),
    maze: ['SOXXXXXXXX', 'OOOXXXXXXX', 'OXOOOXOOOO', 'XXXXOXOXXO', 'OOOOOOOXXO', 'OXXOXXXXXO', 'OOOOXXXXXE'],
  },
  {
    id: 13,
    uploadDate: new Date(2022, 7, 18, 17, 23, 42).toLocaleString(),
    maze: ['SOXXXXXXXX', 'OOOXXXXXXX', 'OXOOOXOOOO', 'XXXXOXOXXO', 'OOOOOOOXXO', 'OXXOXXXXXO', 'OOOOXXXXXE'],
  },
];
