const padWithZero = (n: number) => {
  n = Math.round(n);
  if (n < 10) {
    return `0${n}`;
  }
  return n.toString();
};

export const timeFormat = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return `${padWithZero(min)}:${padWithZero(sec)}`;
};
