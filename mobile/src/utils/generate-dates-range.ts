import dayjs from "dayjs";

export const generateDatesRange = () => {
  const startDate = dayjs().startOf("year");
  const today = new Date();

  const dates = [];
  let compareDate = startDate;

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }

  return dates;
};
