import { Check } from "phosphor-react";
import { Checkbox } from "./Checkbox";
import { useState } from "react";
import { api } from "../libs/axios";

const WEEK_DAYS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

interface SubmitValuesType {
  title: string;
  weekDays: number[];
}
const INITIAL_DATE = { title: "", weekDays: [] };

export const NewHabitForm = () => {
  const [values, setValues] = useState<SubmitValuesType>(INITIAL_DATE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleToggleWeekDay = (day: number) => {
    if (values?.weekDays?.includes(day)) {
      const weekDays = values.weekDays?.filter((weekDay) => weekDay !== day);
      setValues({ ...values, weekDays });
    } else {
      const weekDays = [...values.weekDays, day];
      setValues({ ...values, weekDays });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, weekDays } = values;

    if (title && weekDays.length > 0) {
      api
        .post("/habits", {
          title,
          weekDays,
        })
        .then(() => setValues(INITIAL_DATE))
        .catch((err) => console.error(err.response.data));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-6">
      <label>
        <p>Qual seu comprometimento?</p>
        <input
          type="text"
          name="title"
          className="p-4 mt-1 rounded-lg bg-zinc-800 text-white"
          autoFocus
          value={values.title}
          onChange={handleChange}
        />
      </label>

      <p className="mt-5">Qual a recorrência?</p>
      {WEEK_DAYS.map((day, index) => (
        <Checkbox
          key={index}
          title={day}
          checked={values.weekDays.includes(index)}
          onChange={() => handleToggleWeekDay(index)}
        />
      ))}

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
