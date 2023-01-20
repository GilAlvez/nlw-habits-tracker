import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { generateProgressPercent } from "../utils/generate-progress-percentage";
import clsx from "clsx";
import dayjs from "dayjs";

interface HabitDayProps extends TouchableOpacityProps {
  active?: boolean;
  amount?: number;
  completed?: number;
  date?: Date;
}

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;
export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

export const HabitDay = ({
  active,
  amount = 0,
  completed = 0,
  date,
  ...rest
}: HabitDayProps) => {
  const donePercent = amount > 0 && generateProgressPercent(amount, completed);
  const today = dayjs().startOf("day").toDate();
  const currentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity
      className={clsx(" m-1 border-2 rounded-lg", {
        "opacity-100": active,
        "opacity-60": !active,
        "bg-zinc-900 border-zinc-800": donePercent == 0,
        "bg-violet-900 border-violet-800": donePercent > 0 && donePercent < 20,
        "bg-violet-800 border-violet-700":
          donePercent >= 20 && donePercent < 40,
        "bg-violet-700 border-violet-600":
          donePercent >= 40 && donePercent < 60,
        "bg-violet-600 border-violet-500":
          donePercent >= 60 && donePercent < 80,
        "bg-violet-500 border-violet-400": donePercent >= 80,
        "border-zinc-500": currentDay,
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.6}
      {...rest}
    />
  );
};
