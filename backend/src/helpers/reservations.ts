import { prisma } from "../prisma";
import { ReservationData } from "../types/reservation";
import { Result } from "../types/result";

export const createReservation = async ({ year, month, day, timeslot }: ReservationData): Promise<Result<undefined>> => {
  try {
    const existingReservation = await prisma.reservation.findUnique({
      where: {
        year_month_day_timeslot: {
          year,
          month,
          day,
          timeslot,
        },
      },
    });
    if (existingReservation) {
      return {
        data: null,
        error: {
          message: "Timeslot is taken",
          status: 400,
        },
      };
    }

    await prisma.$transaction(async (transaction) => {
      await transaction.$executeRaw`LOCK TABLE "Reservation" IN ROW EXCLUSIVE MODE`;

      await transaction.reservation.create({
        data: {
          year,
          month,
          day,
          timeslot,
        },
      });
    });

    return {
      error: null,
      data: undefined,
    };
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
}
