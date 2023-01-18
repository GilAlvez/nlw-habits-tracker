import { TouchableOpacity, View, Text } from "react-native";
import Logo from "../assets/logo.svg";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

export const Header = () => {
  return (
    <View className="flex-row items-center justify-between">
      <Logo />
      <TouchableOpacity
        className="flex-row items-center px-3 py-2 border rounded-lg gap-x-2 border-violet-500"
        activeOpacity={0.6}
      >
        <Feather name="plus" color={colors.violet[500]} size={22} />
        <Text className="text-base font-semibold text-white">Novo</Text>
      </TouchableOpacity>
    </View>
  );
};
