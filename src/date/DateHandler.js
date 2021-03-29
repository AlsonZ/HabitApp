import {parse, format} from 'date-fns';

export const getDateObject = (dateString) => {
  return parse(dateString, 'dd/MM/yyyy', new Date());
};
export const getDateString = (dateObj) => {
  return format(dateObj, 'dd/MM/yyyy');
};
export const getTodaysDateObject = () => {
  return getDateObject(getDateString(new Date()));
};
export const getTodaysDateString = () => {
  return formatDate(new Date());
};
