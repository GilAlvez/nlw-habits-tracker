import { View, Text, ScrollView, Alert } from "react-native";

import { generateDatesRange } from "../utils/generate-dates-range";
import { Header } from "../components/Header";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { api } from "../libs/axios";
import dayjs from "dayjs";

interface Summary {
  id: string;
  date: string;
  completed: number;
  amount: number;
}

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateDatesRange();
const minSummaryDatesSizes = 5 * 7 + 1; // 52week * 7days + 1 = 365days
const amountOfDays = minSummaryDatesSizes - datesFromYearStart.length;

export const Home = () => {
  const { navigate } = useNavigation();
  const [summary, setSummary] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/summary");
      setSummary(res.data);
    } catch (err: any) {
      Alert.alert("Ops", "Não foi possível carregar os hábitos");
      console.log(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleSummaryDates = (day: Date) => {
    return summary.find((summaryDay) =>
      dayjs(day).isSame(summaryDay.date, "day")
    );
  };

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
            <HabitDay
              key={date.toString()}
              onPress={() => navigate("habit", { date: date.toISOString() })}
              amount={handleSummaryDates(date)?.amount}
              completed={handleSummaryDates(date)?.completed}
              date={date}
              active
            />
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
