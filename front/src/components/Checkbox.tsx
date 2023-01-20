import * as UICheckbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

interface CheckboxProps {
  title: string;
  onChange?: (checked: UICheckbox.CheckedState) => void;
  checked?: UICheckbox.CheckedState;
}

export const Checkbox = ({ title, checked, onChange }: CheckboxProps) => {
  return (
    <div className="mt-2 flex flex-col gap-3 ">
      <UICheckbox.Root
        className="flex items-center gap-3 group"
        checked={checked}
        onCheckedChange={onChange}
      >
        <div className="h-7 w-7 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-600">
          <UICheckbox.Indicator>
            <Check size={20} className="text-white" />
          </UICheckbox.Indicator>
        </div>

        <span className="font-semibold text-lg text-white group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
          {title}
        </span>
      </UICheckbox.Root>
    </div>
  );
};
