import { View, Text, ScrollView } from "react-native";

import { generateDatesRange } from "../utils/generate-dates-range";
import { Header } from "../components/Header";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateDatesRange();
const minSummaryDatesSizes = 52 * 7 + 1; // 52week * 7days + 1 = 365days
const amountOfDays = minSummaryDatesSizes - datesFromYearStart.length;

export const Home = () => {
  return (
    <View className="flex-1 px-8 pt-16 bg-woodsmoke-900">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((day, index) => (
          <Text
            key={index}
            className="mx-1 text-xl font-bold text-center text-zinc-400"
            style={{ width: DAY_SIZE }}
          >
            {day}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => (
            <HabitDay active key={date.toString()} />
          ))}
          {amountOfDays > 0 &&
            Array.from({ length: amountOfDays }).map((_, index) => (
              <HabitDay key={index} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};
