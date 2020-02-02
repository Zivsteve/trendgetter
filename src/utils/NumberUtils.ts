/**
 *
 * @param num
 */
export function formatNumber(num: number | string) {
  return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatNumberShort(num: number | string, digits: number) {
  num = +num;
  var si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
}

/**
 *
 * @param previous
 */
export function timeAgo(previous: number | Date | string) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const elapsed = +new Date() - +new Date(previous);
  let values = [0, ''];

  if (elapsed < msPerMinute) {
    values = [Math.round(elapsed / 1000), 'second'];
  } else if (elapsed < msPerHour) {
    values = [Math.round(elapsed / msPerMinute), 'minute'];
  } else if (elapsed < msPerDay) {
    values = [Math.round(elapsed / msPerHour), 'hour'];
  } else if (elapsed < msPerMonth) {
    values = [Math.round(elapsed / msPerDay), 'day'];
  }

  return `${values[0]} ${values[1]}${values[0] > 1 ? 's' : ''} ago`;
}

/**
 *
 */
export function getReadableDate() {
  return new Date().toDateString().replace(' ', ', ');
}
