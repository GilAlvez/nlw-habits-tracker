import { useRoute } from "@react-navigation/native";
import { Alert, ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { useEffect, useState } from "react";
import { api } from "../libs/axios";
import Loading from "../components/Loading";
import { generateProgressPercent } from "../utils/generate-progress-percentage";

interface HabitParams {
  date: string;
}

interface HabitInfo {
  completedHabits: string[];
  possibleHabits: Array<{
    id: string;
    title: string;
  }>;
}

export const Habit = () => {
  const [habits, setHabits] = useState<HabitInfo>();
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const { date } = route.params as HabitParams;
  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());
  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");
  const habitsProgress = habits?.possibleHabits.length
    ? generateProgressPercent(
        habits.possibleHabits.length,
        habits.completedHabits.length
      )
    : 0;

  const getHabits = async () => {
    try {
      setLoading(true);
      const res = await api.get("/day", { params: { date } });
      setHabits(res.data);
    } catch (error: any) {
      console.error(error.response);
      Alert.alert(
        "Ops",
        "Não foi possível carregar as informações dos hábitos"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHabits();
  }, []);

  const handleHabitChange = async (habitId: string) => {
    const isHabitCompleted = habits?.completedHabits.includes(habitId);
    let completedHabits: string[] = [];

    try {
      await api.patch(`/habits/${habitId}/toggle`);

      if (isHabitCompleted) {
        completedHabits = habits!.completedHabits.filter((id) => id != habitId);
      } else {
        completedHabits = [...habits!.completedHabits, habitId];
      }
      setHabits({ ...habits!, completedHabits });
    } catch (error: any) {
      console.log(error);
      Alert.alert("Ops", "Não foi possivel atualizar o status do hábito");
    }
  };

  if (loading) {
    return <Loading />;
  }

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
        <ProgressBar progress={habitsProgress} />

        <View className="mt-6">
          {habits?.possibleHabits?.map(({ id, title }) => (
            <Checkbox
              key={id}
              label={title}
              checked={habits.completedHabits.includes(id)}
              onPress={() => handleHabitChange(id)}
              disabled={isDateInPast}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
