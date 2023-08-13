import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: IParams }
) {
  const currentuser = await getCurrentUser();
  if (!currentuser) {
    return NextResponse.error();
  }
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invald id");
  }
  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentuser.id,
    },
  });
  return NextResponse.json(listing);
}
