import { TouchableOpacity, View, Text } from "react-native";
import Logo from "../assets/logo.svg";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

export const Header = () => {
  const { navigate } = useNavigation();
  return (
    <View className="flex-row items-center justify-between">
      <Logo />
      <TouchableOpacity
        className="flex-row items-center px-3 py-2 border rounded-lg gap-x-2 border-violet-500"
        activeOpacity={0.6}
        onPress={() => navigate("new")}
      >
        <Feather name="plus" color={colors.violet[500]} size={22} />
        <Text className="text-base font-semibold text-white">Novo</Text>
      </TouchableOpacity>
    </View>
  );
};
