import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentuser = await getCurrentUser();
  if (!currentuser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  const reservations = await getReservations({ userId: currentuser.id });
  if (reservations.length === 0) {
    <EmptyState
      title="No trips found"
      subtitle="Looks like you have not reserved any trips"
    />;
  }
  return <TripsClient reservations={reservations} currentuser={currentuser} />;
};

export default TripsPage;
