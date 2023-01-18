interface HabitDayProps {
  active?: boolean;
}

const HabitDay = ({ active }: HabitDayProps) => {
  return (
    <div
      className={`w-10 aspect-square bg-zinc-900 border-2 border-zinc-800 rounded-lg ${
        active ? "opacity-100" : "opacity-60"
      }`}
    />
  );
};

export default HabitDay;
