import moment from 'moment-timezone';

export const isTimeInInterval = () => {
  // Получить текущее время в московском часовом поясе
  const moscowTime = moment().tz("Europe/Moscow");

  // Получить часы и минуты
  const currentHour = moscowTime.hour();
  const currentMinute = moscowTime.minute();

  // Проверить, попадает ли текущее время в интервал от 18:00 до 23:59
  if ((currentHour > 18 || (currentHour === 18 && currentMinute >= 0)) &&
      (currentHour < 23 || (currentHour === 23 && currentMinute <= 59))) {
    return true;
  } else {
    return false;
  }
};