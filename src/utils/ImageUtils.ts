export function isValidImage(url = '') {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}
