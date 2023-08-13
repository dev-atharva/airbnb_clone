import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  reservationId: string;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: IParams }
) {
  const currentuser = await getCurrentUser();
  if (!currentuser) {
    return NextResponse.error();
  }
  const { reservationId } = params;
  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid Id");
  }
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentuser.id }, { listing: { userId: currentuser.id } }],
    },
  });
  return NextResponse.json(reservation);
}
