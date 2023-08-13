import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentuser = await getCurrentUser();
    if (!currentuser) {
      return [];
    }
    const favorite = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentuser.favoriteIds || [])],
        },
      },
    });
    const safefavorites = favorite.map((favor) => ({
      ...favor,
      createdAt: favor.createdAt.toISOString(),
    }));
    return safefavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
