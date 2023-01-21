import React, { useEffect, useState } from "react";
import { Checkbox } from "./Checkbox";
import { api } from "../libs/axios";
import dayjs from "dayjs";

interface HabitListProps {
  date?: Date;
  onCompletedChange: (completed?: number) => void;
}

interface HabitsInfo {
  possibleHabits: { id: string; title: string; created_at: string }[];
  completedHabits: string[];
}

export const HabitsList = ({ date, onCompletedChange }: HabitListProps) => {
  const [habits, setHabits] = useState<HabitsInfo>();

  useEffect(() => {
    api
      .get("/day", {
        params: {
          date: date?.toISOString(),
        },
      })
      .then((res) => {
        setHabits(res.data);
      });
  }, []);

  const handleToggleHabit = async (habitId: string) => {
    const isHabitCompleted = habits?.completedHabits.includes(habitId);
    let completedHabits: string[] = [];

    try {
      await api.patch(`/habits/${habitId}/toggle`);
      if (isHabitCompleted) {
        completedHabits = habits!.completedHabits.filter((id) => id != habitId);
      } else {
        completedHabits = [...habits!.completedHabits, habitId];
      }
      setHabits({ ...habits!, completedHabits });
      onCompletedChange(habits?.completedHabits.length);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  return (
    <div>
      {habits?.possibleHabits.map((hab) => (
        <Checkbox
          key={hab.id}
          title={hab.title}
          disabled={isDateInPast}
          checked={habits.completedHabits.includes(hab.id)}
          onChange={() => handleToggleHabit(hab.id)}
        />
      ))}
    </div>
  );
};
