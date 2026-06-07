import { describe, it, expect } from 'vitest';
import { generateQuestion, generateOptions } from './gameLogic';

describe('generateQuestion', () => {
  it('correct answer equals a * b', () => {
    for (let i = 0; i < 50; i++) {
      const q = generateQuestion(10);
      expect(q.correct).toBe(q.a * q.b);
    }
  });

  it('a and b stay within difficulty range', () => {
    for (let i = 0; i < 50; i++) {
      const q = generateQuestion(15);
      expect(q.a).toBeGreaterThanOrEqual(1);
      expect(q.a).toBeLessThanOrEqual(15);
      expect(q.b).toBeGreaterThanOrEqual(1);
      expect(q.b).toBeLessThanOrEqual(15);
    }
  });

  it('options array has exactly 4 elements', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateQuestion(10);
      expect(q.options).toHaveLength(4);
    }
  });

  it('options include the correct answer', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateQuestion(10);
      expect(q.options).toContain(q.correct);
    }
  });
});

describe('generateOptions', () => {
  it('returns exactly 4 options', () => {
    expect(generateOptions(8, 13, 104)).toHaveLength(4);
    expect(generateOptions(1, 1, 1)).toHaveLength(4);
    expect(generateOptions(5, 5, 25)).toHaveLength(4);
  });

  it('always includes the correct answer', () => {
    expect(generateOptions(8, 13, 104)).toContain(104);
    expect(generateOptions(3, 7, 21)).toContain(21);
  });

  it('has no duplicate options', () => {
    for (let i = 0; i < 30; i++) {
      const a = Math.ceil(Math.random() * 20);
      const b = Math.ceil(Math.random() * 20);
      const correct = a * b;
      const opts = generateOptions(a, b, correct);
      expect(new Set(opts).size).toBe(4);
    }
  });

  it('all options are positive numbers', () => {
    const opts = generateOptions(1, 1, 1);
    opts.forEach(o => expect(o).toBeGreaterThan(0));
  });

  it('wrong options are near the correct answer (nearby products)', () => {
    const opts = generateOptions(8, 13, 104);
    const wrongs = opts.filter(o => o !== 104);
    wrongs.forEach(w => expect(Math.abs(w - 104)).toBeLessThan(50));
  });
});
