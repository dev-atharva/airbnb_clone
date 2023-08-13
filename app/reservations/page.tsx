import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentuser = await getCurrentUser();
  if (!currentuser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />;
  }
  const reservations = await getReservations({
    authorId: currentuser.id,
  });
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties"
      />
    );
  }

  return (
    <div>
      <ReservationsClient
        reservations={reservations}
        currentuser={currentuser}
      />
    </div>
  );
};

export default ReservationsPage;
