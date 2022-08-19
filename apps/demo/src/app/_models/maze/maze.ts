export interface IMaze {
  id: number;
  uploadDate: string;
  maze: string[][];
  start: [number, number];
  end: [number, number];
}
