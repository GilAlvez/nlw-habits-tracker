import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { prisma } from "libs/prisma";
import { z } from "zod";

export const routes = async (server: FastifyInstance) => {
  server.post("/habits", async (req, res) => {
    const createHabitSchema = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitSchema.parse(req.body);

    const today = dayjs().startOf("day").toDate();
    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((day) => {
            return { week_day: day };
          }),
        },
      },
    });
  });

  server.get("/day", async (req, res) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(req.query);
    const weekDay = dayjs(date).get("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date,
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits = day?.dayHabits.map((day) => {
      return day.habit_id;
    });
    return { possibleHabits, completedHabits };
  });
};
