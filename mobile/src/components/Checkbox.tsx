import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

interface CheckboxProps extends TouchableOpacityProps {
  label: string;
  checked?: boolean;
}

export const Checkbox = ({
  label,
  checked = false,
  ...rest
}: CheckboxProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className="flex-row items-center mb-2"
      {...rest}
    >
      {checked ? (
        <View className="items-center justify-center w-8 h-8 bg-green-500 rounded-lg">
          <Feather name="check" size={20} color={colors.white} />
        </View>
      ) : (
        <View className="w-8 h-8 rounded-lg bg-zinc-900"></View>
      )}

      <Text className="ml-3 text-white">{label}</Text>
    </TouchableOpacity>
  );
};
