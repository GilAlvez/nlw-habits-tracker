import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

interface HabitDayProps extends TouchableOpacityProps {
  active?: boolean;
}

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;
export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

export const HabitDay = ({ active, ...rest }: HabitDayProps) => {
  return (
    <TouchableOpacity
      className={`m-1 border-2 rounded-lg bg-zinc-900 border-zinc-800 ${
        active ? "opacity-100" : "opacity-70"
      }`}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.6}
      {...rest}
    />
  );
};
