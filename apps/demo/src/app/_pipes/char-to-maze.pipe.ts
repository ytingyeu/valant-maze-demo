import { Pipe, PipeTransform } from '@angular/core';
import { mazeDisplayDict } from '../_models/maze/maze';
@Pipe({
  name: 'charToMaze',
})
export class CharToMazePipe implements PipeTransform {
  mazeHashMap: {};

  constructor() {}

  transform(symbol: string): string {
    return mazeDisplayDict.get(symbol);
  }
}
