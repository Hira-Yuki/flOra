export function formatDateRange(dateRange) {
  const [startDateStr, endDateStr] = dateRange
    .split('–')
    .map((str) => str.trim());

  const [startMonth, startDay] = startDateStr.split(' ');

  // (같은 월)
  if (!endDateStr.includes(' ')) {
    const endDay = endDateStr;
    return `${startMonth.slice(0, 3).toUpperCase()} ${startDay} – ${endDay}`;
  }

  const [endMonth, endDay] = endDateStr.split(' ');

  // (다른 월)
  return `${startMonth.slice(0, 3).toUpperCase()} ${startDay} – ${endMonth.slice(0, 3).toUpperCase()} ${endDay}`;
}
