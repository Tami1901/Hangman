const pero = 'asdasdas d,as,d ,asd, as,d ';

const alpha = Array.from(new Array(26), (_, i) => String.fromCharCode(i + 65));
console.log(
  pero
    .toUpperCase()
    .split('')
    .map((letter) => ({ letter, show: alpha.includes(letter) }))
);
