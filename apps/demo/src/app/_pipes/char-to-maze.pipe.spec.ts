import { CharToMazePipe } from './char-to-maze.pipe';

describe('CharToMazePipe', () => {
  it('create an instance', () => {
    const pipe = new CharToMazePipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms "SCEXO" to "🐁🐁🧀⬛ "', () => {
    const pipe = new CharToMazePipe();
    expect(pipe.transform('S')).toBe('🐁');
    expect(pipe.transform('C')).toBe('🐁');
    expect(pipe.transform('E')).toBe('🧀');
    expect(pipe.transform('X')).toBe('⬛');
    expect(pipe.transform('O')).toBe(' ');
  });
});
