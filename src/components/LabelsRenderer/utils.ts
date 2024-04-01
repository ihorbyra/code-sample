export function getShorterNumber(number = 0): string {
  let n = Number(number);
  let suffix = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const key of ['', 'K', 'M', 'B']) {
    suffix = key;
    if (Math.abs(n) < 1000) {
      break;
    } else {
      n /= 1000;
    }
  }
  if (Math.abs(n) < 10) {
    n = Math.floor(n * 10) / 10;
  } else {
    n = Math.floor(n);
  }
  return String(n).replace('.', ',') + suffix;
}
