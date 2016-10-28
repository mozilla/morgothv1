export function verionToInt(v) {
  return v.split('.').reduce(
    (prev, curr, i) => prev + (parseInt(curr, 10) * Math.pow(1000, 2 - i))
    , 0
  );
}

export function compareVersions(a, b) {
  return verionToInt(a) - verionToInt(b);
}
