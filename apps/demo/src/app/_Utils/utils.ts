import { ICell, mazeSymbols } from '../_models/maze/maze';

export class Utils {
  public static convertGraphStringToList(graphString: string) {
    const graph: string[][] = [];

    graphString.toUpperCase().split('#').forEach((row) => {
      graph.push(row.split(''));
    });

    return graph;
  }

  public static getStartAndExit(graphString: string): [ICell, ICell] {
    let start: ICell;
    let exit: ICell;

    graphString.split('#').forEach((row: string, rowIdx: number) => {
      row.split('').forEach((symbol: string, colIdx: number) => {
        if (symbol == mazeSymbols.start) {
          start = {
            row: rowIdx,
            col: colIdx,
          };
        }

        if (symbol == mazeSymbols.exit) {
          exit = {
            row: rowIdx,
            col: colIdx,
          };
        }

        if (start !== undefined && exit !== undefined) {
          return;
        }
      });
    });

    return [start, exit];
  }
}
