export const daysInMonth = ({
  year,
  month,
}: {
  year: number,
  month: number,
}): number => {
  return new Date(year, month, 0).getDate();
};
