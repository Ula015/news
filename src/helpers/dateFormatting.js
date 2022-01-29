// функция форматирования даты

export function day(data) {
  return Number(data.split("-")[0]);
}

export function month(data) {
  return Number(data.split("-")[1]);
}

export function year(data) {
  return Number(data.split("-")[2]);
}

export function phoneNumber(number) {
  return "+" + number.replace(/[^0-9]/g, "").replace(/ +/, " ");
}
