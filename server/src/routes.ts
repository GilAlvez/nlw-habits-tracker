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

  server.patch("/habits/:id/toggle", async (req, res) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = toggleHabitParams.parse(req.params);

    const today = dayjs().startOf("day").toDate();

    // Achar o dia de hoje
    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    // Caso não ache ele vai criar um na tabela de dias
    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      });
    }

    // Busca na tabela dayHabits se o usuário ja tinha marcado como completo o habito
    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });

    if (dayHabit) {
      // Uncheck Hábito
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else {
      // Check Hábito
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      });
    }
  });

  server.get("/summary", async (req, res) => {
    const summary = await prisma.$queryRaw`
      SELECT 
        D.id,
        D.date,
        (
          SELECT 
            cast(count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE 
            HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
            AND H.created_at <= D.date
        ) as amount
      FROM days D
    `;

    return summary;
  });
};
