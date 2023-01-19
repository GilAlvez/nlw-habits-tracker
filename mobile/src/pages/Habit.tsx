import { useRoute } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";

interface HabitParams {
  date: string;
}

export const Habit = () => {
  const route = useRoute();
  const { date } = route.params as HabitParams;
  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  return (
    <View className="flex-1 px-8 pt-16 bg-woodsmoke-900">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-base font-semibold lowercase text-zinc-400">
          {dayOfWeek}
        </Text>
        <Text className="mt-2 text-5xl font-extrabold text-zinc-400">
          {dayAndMonth}
        </Text>
        <ProgressBar progress={50} />

        <View className="mt-6">
          <Checkbox label="Exercicios" checked />
          <Checkbox label="Beber agua" />
        </View>
      </ScrollView>
    </View>
  );
};
