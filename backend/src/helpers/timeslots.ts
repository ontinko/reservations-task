import { prisma } from "../prisma";
import { Result } from "../types/result";
import { TimeslotData, TimeslotsDTO } from "../types/timeslot";
import { daysInMonth } from "./misc";

export const getTimeslots = async ({ year, month }: TimeslotData): Promise<Result<TimeslotsDTO>> => {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        year,
        month,
      },
    });
    const schedule = await prisma.schedule.findFirst();
    if (!schedule) {
      return {
        data: null,
        error: {
          message: "No schedule found",
          status: 500,
        },
      };
    }

    const { startHour, endHour } = schedule;
    const timeslots: TimeslotsDTO = {};

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();
    const currentHour = new Date().getHours();

    const isCurrentMonth = year === currentYear && month === currentMonth;

    for (let day = isCurrentMonth ? currentDay : 1; day <= daysInMonth({ year, month }); day++) {
      const reservationsForDay: {
        [key: number]: boolean;
      } = {};
      const timeslotsForDay: number[] = []
      const isCurrentDay = isCurrentMonth && currentDay === day;

      reservations.filter(r => r.day === day).forEach(r => reservationsForDay[r.timeslot] = true);

      for (let hour = isCurrentDay ? currentHour + 1 : startHour; hour < endHour; hour++) {
        if (!reservationsForDay[hour]) {
          timeslotsForDay.push(hour);
        }
      }

      if (timeslotsForDay.length) {
        timeslots[day] = timeslotsForDay;
      }
    }

    return {
      data: timeslots,
      error: null,
    }
  } catch (err) {
    console.error(err);
    return {
      data: null,
      error: {
        message: "Something went wrong",
        status: 500,
      },
    };
  }
};
