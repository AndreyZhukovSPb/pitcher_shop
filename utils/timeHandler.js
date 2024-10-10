import moment from 'moment-timezone';

export const isTimeInInterval = () => {
  const moscowTime = moment().tz("Europe/Moscow");
  const currentHour = moscowTime.hour();

  if (currentHour < 18){
    return true;
  } else {
    return false;
  }
};