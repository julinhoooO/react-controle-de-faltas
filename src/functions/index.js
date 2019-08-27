export function getStringDate(date = new Date()) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  if (month < 10) {
    month++;
    month = '0' + month;
  }

  return year + '-' + month + '-' + day;
}

export function formatDateBR(stringDate = getStringDate()) {
  return stringDate
    .split('-')
    .reverse()
    .join('/');
}
