export function versionToInt(v) {
  return v.split('.').reduce((prev, curr, i) => (
    prev + (parseInt(curr, 10) * (1000 ** (2 - i)))
  ), 0);
}

export function compareVersions(a, b) {
  return versionToInt(a) - versionToInt(b);
}
