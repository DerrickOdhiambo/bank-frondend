export function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function roundToTwo(num) {
  return +(Math.round(num + 'e+2') + 'e-2');
}
