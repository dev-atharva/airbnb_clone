import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: NextRequest) {
  const currentuser = await getCurrentUser();
  if (!currentuser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }
  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentuser.id,
          startDate: startDate,
          endDate: endDate,
          totalPrice: totalPrice,
        },
      },
    },
  });
  return NextResponse.json(listingAndReservation);
}
