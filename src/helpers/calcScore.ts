import { alphabet } from '../constants/alphabet';
import { ATTEMPTS } from '../constants/gameConfig';

const MAX_LEN = 200;

type ScoreType = {
  err: number;
  unique: number;
  len: number;
  duration: number;
};

export const calcScore = ({ err, unique, len, duration }: ScoreType): number => {
  return (
    Math.round(
      ((1 - err / alphabet.length) * 10000 +
        (unique / alphabet.length) * 100 +
        (len / MAX_LEN) * 10 +
        (1 - duration / 1800000)) *
        10000
    ) / 1000
  );
};
