import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentuser = await getCurrentUser();
  if (!currentuser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  const listings = await getListings({ userId: currentuser.id });
  if (listings.length === 0) {
    <EmptyState
      title="No properties found"
      subtitle="Looks like you have no properties"
    />;
  }
  
  return <PropertiesClient listings={listings} currentuser={currentuser} />;
};

export default PropertiesPage;
