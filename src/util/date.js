import { format } from "date-fns";

export const setEndOfTheDayTime = (date) => {
  date.setHours(23, 59, 0, 0);
};

export const setStartOfTheDayTime = (date) => {
  date.setHours(0, 0, 0, 0);
};

export const convertDateToString1 = (date) => {
  return format(date, "yyyy-MM-dd");
};

export function isBetweenTwoDates(fromDate, toDate) {
  setStartOfTheDayTime(fromDate);
  setEndOfTheDayTime(toDate);
  const fromDateTime = fromDate.getTime(),
    toDateTime = toDate.getTime();
  return function(currentDate) {
    const currentDateTime = currentDate.getTime();
    return currentDateTime >= fromDateTime && currentDateTime <= toDateTime;
  };
}
