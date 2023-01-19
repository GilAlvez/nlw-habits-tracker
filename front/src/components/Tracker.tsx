import React from "react";
import HabitDay from "./HabitDay";
import { generateDatesRange } from "../utils/generate-dates-range";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateDatesRange();
const minSummarySize = 10 * 7 + 1; // 52 Semanas
const amountOfDays = minSummarySize - summaryDates.length;

const Tracker = () => {
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
        {summaryDates.map((date) => (
          <HabitDay
            amount={10}
            completed={Math.round(Math.random() * 10)}
            active
            key={date.toString()}
          />
        ))}

        {amountOfDays > 0 &&
          Array.from({ length: amountOfDays }).map((_, index) => (
            <HabitDay amount={0} completed={1} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Tracker;
