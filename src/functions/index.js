export function getStringDate(date = new Date()) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  month++;

  if (month < 10) {
    month = '0' + month;
  }

  if (day < 10) {
    day = '0' + day;
  }

  return year + '-' + month + '-' + day;
}

export function formatDateBR(stringDate = getStringDate()) {
  return stringDate
    .split('-')
    .reverse()
    .join('/');
}
