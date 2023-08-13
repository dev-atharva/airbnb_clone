import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface Params {
  listingId?: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const currentuser = await getCurrentUser();
  if (!currentuser) {
    return NextResponse.error();
  }
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }
  let favoriteIds = [...(currentuser.favoriteIds || [])];
  favoriteIds.push(listingId);
  const user = await prisma.user.update({
    where: {
      id: currentuser.id,
    },
    data: {
      favoriteIds,
    },
  });
  return NextResponse.json(user);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  const currentuser = await getCurrentUser();
  if (!currentuser) {
    return NextResponse.error();
  }
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }
  let favoriteIds = [...(currentuser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);
  const user = await prisma.user.update({
    where: {
      id: currentuser.id,
    },
    data: {
      favoriteIds: favoriteIds,
    },
  });
  return NextResponse.json(user);
}
