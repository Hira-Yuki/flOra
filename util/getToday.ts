import dayjs from 'dayjs';

export const getToday = () => dayjs().date().toString();
