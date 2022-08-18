import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'charToMaze',
})
export class CharToMazePipe implements PipeTransform {
  mazeHashMap: {};

  constructor() {
    this.mazeHashMap = {
      S: '🐁',
      E: '🧀',
      O: ' ',
      X: '⬛',
    };
  }

  transform(value: string): string {
    return this.mazeHashMap[value];
  }
}
