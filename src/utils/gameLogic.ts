import type { Question } from '../types';

export function generateQuestion(difficulty: number): Question {
  const a = Math.floor(Math.random() * difficulty) + 1;
  const b = Math.floor(Math.random() * difficulty) + 1;
  const correct = a * b;
  const options = generateOptions(a, b, correct);
  return { a, b, correct, options };
}

export function generateOptions(a: number, b: number, correct: number): number[] {
  const candidates = [
    (a - 2) * b, (a - 1) * b, (a + 1) * b, (a + 2) * b,
    a * (b - 2), a * (b - 1), a * (b + 1), a * (b + 2),
    (a - 1) * (b - 1), (a + 1) * (b + 1),
    (a - 1) * (b + 1), (a + 1) * (b - 1),
  ].filter(n => n > 0 && n !== correct);

  const unique = Array.from(new Set(candidates));
  const wrongs = unique.slice(0, 3);

  // Fallback: sequential numbers if not enough nearby candidates
  let fallback = correct + 1;
  while (wrongs.length < 3) {
    if (fallback !== correct && !wrongs.includes(fallback)) wrongs.push(fallback);
    fallback++;
  }

  const options = [correct, ...wrongs.slice(0, 3)];

  // Fisher-Yates shuffle
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}
