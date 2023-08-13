import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoriteClient from "./FavoriteClient";

const ListingPage = async () => {
  const currentuser = await getCurrentUser();
  const favorites = await getFavoriteListings();
  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings"
      />
    );
  }

  return <FavoriteClient listings={favorites} currentuser={currentuser} />;
};

export default ListingPage;
