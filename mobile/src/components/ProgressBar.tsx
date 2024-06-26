import { View } from "react-native";

interface ProgressBarProps {
  progress?: number;
}

export const ProgressBar = ({ progress = 0 }: ProgressBarProps) => {
  return (
    <View className="w-full h-3 mt-4 rounded-xl bg-zinc-700">
      <View
        className="h-3 rounded-xl bg-violet-600"
        style={{ width: `${progress}%` }}
      />
    </View>
  );
};
