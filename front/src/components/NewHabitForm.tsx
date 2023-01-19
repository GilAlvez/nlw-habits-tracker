import { Check } from "phosphor-react";

export const NewHabitForm = () => {
  return (
    <form className="flex flex-col mt-6">
      <label className="font-semibold">
        <input type="text" autoFocus />
      </label>

      <label>
        <input
          type="text"
          className="p-4 rounded-lg mt-3 bg-zinc-800 text-white"
        />
      </label>

      <button
        type="submit"
        className="mt-6 border border-violet-500/60 font-semibold rounded-lg px-6 py-4 flex justify-center items-center gap-3 bg-violet-500/5 hover:bg-violet-500/20 hover:border-violet-500/100"
      >
        <Check weight="bold" />
        Confirmar
      </button>
    </form>
  );
};
