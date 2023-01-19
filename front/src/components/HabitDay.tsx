import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgressBar";
import clsx from "clsx";

interface HabitDayProps {
  active?: boolean;
  amount: number;
  completed: number;
}

const HabitDay = ({ active, amount, completed }: HabitDayProps) => {
  const donePercent = active ? Math.round((completed / amount) * 100) : 0;

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx("w-10 aspect-square border-2 rounded-lg", {
          "opacity-100": active,
          "opacity-60": !active,
          "bg-zinc-900 border-zinc-800": donePercent == 0,
          "bg-violet-900 border-violet-800":
            donePercent > 0 && donePercent < 20,
          "bg-violet-800 border-violet-700":
            donePercent >= 20 && donePercent < 40,
          "bg-violet-700 border-violet-600":
            donePercent >= 40 && donePercent < 60,
          "bg-violet-600 border-violet-500":
            donePercent >= 60 && donePercent < 80,
          "bg-violet-500 border-violet-400": donePercent >= 80,
        })}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[340px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">quinta-feira</span>
          <span className="font-extrabold text-3xl">17/01</span>

          <ProgressBar progress={50} />

          <Popover.Arrow height={12} width={20} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default HabitDay;
