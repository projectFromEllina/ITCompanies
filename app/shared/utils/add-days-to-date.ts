export function addDaysToDate(date: Date, day: number): Date {
  const millisecondsPerDay = 86400000;
  return new Date(date.getTime() + day * millisecondsPerDay);
}
