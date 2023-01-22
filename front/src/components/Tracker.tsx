import React, { useEffect, useState } from "react";
import HabitDay from "./HabitDay";
import { generateDatesRange } from "../utils/generate-dates-range";
import { api } from "../libs/axios";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateDatesRange();
const minSummarySize = 10 * 7 + 1; // 52 Semanas
const amountOfDays = minSummarySize - summaryDates.length;

interface Summary {
  id: string;
  date: string;
  completed: number;
  amount: number;
}

const Tracker = () => {
  const [summary, setSummary] = useState<Summary[]>([]);

  useEffect(() => {
    api
      .get("/summary")
      .then((res) => {
        console.log(res.data);
        setSummary(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  const handleSummaryDates = (day: Date) => {
    return summary.find((summaryDay) =>
      dayjs(day).isSame(summaryDay.date, "day")
    );
  };

  return (
    <div className="flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-zinc-400 text-xl w-10 aspect-square flex items-center justify-center font-bold"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 &&
          summaryDates.map((date) => (
            <HabitDay
              key={date.toString()}
              amount={handleSummaryDates(date)?.amount}
              defaultCompleted={handleSummaryDates(date)?.completed}
              date={date}
              active
            />
          ))}

        {amountOfDays > 0 &&
          Array.from({ length: amountOfDays }).map((_, index) => (
            <HabitDay amount={0} defaultCompleted={1} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Tracker;
