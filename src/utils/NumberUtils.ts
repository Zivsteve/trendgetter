export function formatNumber(num: number | string) {
  return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

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

export function getReadableDate() {
  return new Date().toDateString().replace(' ', ', ');
}
