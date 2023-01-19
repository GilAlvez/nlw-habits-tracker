import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

const WEEK_DAYS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export const New = () => {
  const [weekDays, setWeekDays] = useState<number[]>([]);

  const handleToggleCheckbox = (weekDayIndex: number) => {
    weekDays.includes(weekDayIndex)
      ? setWeekDays((state) =>
          state.filter((weekDay) => weekDay !== weekDayIndex)
        )
      : setWeekDays((state) => [...state, weekDayIndex]);
  };

  return (
    <View className="flex-1 px-8 pt-16 bg-woodsmoke-900">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-3xl font-extrabold text-white">
          Criar Hábito
        </Text>

        <Text className="mt-2 text-base text-white font-regular">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 mt-3 text-white rounded-lg bg-zinc-900 focus:border-2 focus:border-violet-600"
          placeholder="Exercicios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
        />

        <Text className="mt-4 mb-3 text-base text-white font-regular">
          Qual a recorrência?
        </Text>

        {WEEK_DAYS.map((day, index) => (
          <Checkbox
            key={day}
            label={day}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleCheckbox(index)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.6}
          className="flex-row items-center justify-center w-full mt-6 bg-green-600 rounded-lg h-14"
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="ml-2 font-semibold text-white">Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
