export const calcScore = (numOfErrors: number): number => {
  return Math.round((100 / (1 + numOfErrors)) * 100) / 100;
};
