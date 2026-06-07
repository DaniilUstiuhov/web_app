type OptionState = 'idle' | 'correct' | 'wrong' | 'highlight';

interface Props {
  value: number;
  state: OptionState;
  disabled: boolean;
  onClick: () => void;
}

export default function AnswerOption({ value, state, disabled, onClick }: Props) {
  const className = ['option-btn', state !== 'idle' ? state : '']
    .filter(Boolean)
    .join(' ');

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {value}
    </button>
  );
}
