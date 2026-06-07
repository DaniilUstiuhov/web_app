import { useState, useEffect, useCallback, useRef } from 'react';
import type { Page, GameResult, Question } from '../types';
import { useSettings } from '../context/SettingsContext';
import { t } from '../i18n';
import { generateQuestion } from '../utils/gameLogic';
import AnswerOption from './AnswerOption';

type OptionState = 'idle' | 'correct' | 'wrong' | 'highlight';

interface Props {
  onNavigate: (page: Page) => void;
  onGameEnd: (result: GameResult) => void;
}

export default function GameSession({ onNavigate: _onNavigate, onGameEnd }: Props) {
  const { language, difficulty } = useSettings();
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [question, setQuestion] = useState<Question>(() => generateQuestion(difficulty));
  const [locked, setLocked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);

  const scoreRef = useRef(0);
  const correctRef = useRef(0);
  const endedRef = useRef(false);

  const endGame = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;
    onGameEnd({ score: scoreRef.current, correctCount: correctRef.current });
  }, [onGameEnd]);

  // 60-second countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // End game when timer hits 0
  useEffect(() => {
    if (timeLeft === 0) endGame();
  }, [timeLeft, endGame]);

  const nextQuestion = () => {
    setQuestion(generateQuestion(difficulty));
    setLocked(false);
    setSelectedIndex(null);
    setWasCorrect(null);
  };

  const handleAnswer = (index: number) => {
    if (locked) return;
    const chosen = question.options[index];
    const correct = chosen === question.correct;

    setLocked(true);
    setSelectedIndex(index);
    setWasCorrect(correct);

    if (correct) {
      const newScore = score + difficulty;
      const newCorrect = correctCount + 1;
      setScore(newScore);
      setCorrectCount(newCorrect);
      scoreRef.current = newScore;
      correctRef.current = newCorrect;
      setTimeout(nextQuestion, 1000);
    } else {
      setTimeout(nextQuestion, 3000);
    }
  };

  const getOptionState = (index: number): OptionState => {
    if (!locked || selectedIndex === null) return 'idle';
    const value = question.options[index];
    if (wasCorrect && index === selectedIndex) return 'correct';
    if (!wasCorrect) {
      if (index === selectedIndex) return 'wrong';
      if (value === question.correct) return 'highlight';
    }
    return 'idle';
  };

  const timerPercent = (timeLeft / 60) * 100;

  return (
    <div className="page">
      <div className="timer-bar-container">
        <div
          className={`timer-bar${timeLeft <= 10 ? ' warning' : ''}`}
          style={{ width: `${timerPercent}%` }}
        />
      </div>

      <div className="score-display">
        {t(language, 'score')}: <strong>{score}</strong>
        &nbsp;|&nbsp;
        {t(language, 'correct')}: <strong>{correctCount}</strong>
        &nbsp;|&nbsp; ⏱ {timeLeft}s
      </div>

      <div className="question">
        {question.a} × {question.b} = ?
      </div>

      <div className="options-grid">
        {question.options.map((value, i) => (
          <AnswerOption
            key={i}
            value={value}
            state={getOptionState(i)}
            disabled={locked}
            onClick={() => handleAnswer(i)}
          />
        ))}
      </div>

      <button className="btn danger" onClick={endGame}>
        {t(language, 'endGame')}
      </button>
    </div>
  );
}
