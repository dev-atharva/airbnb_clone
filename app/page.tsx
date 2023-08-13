import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IlistingParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
interface Homeprops {
  searchParams: IlistingParams;
}
export const dynamic = 'force-dynamic'

const Home = async ({ searchParams }: Homeprops) => {
  const listings = await getListings(searchParams);
  const currentuser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <div>
      <Container>
        <div
          className="
      pt-24 grid grid-cols-1 
      sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
      gap-8 
      "
        >
          {listings.map((listing) => {
            return (
              <ListingCard
                key={listing.id}
                data={listing}
                currentuser={currentuser}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Home;
