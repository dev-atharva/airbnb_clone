"use client";

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface Tripsclientprops {
  reservations: SafeReservation[];
  currentuser?: SafeUser | null;
}

const TripsClient: React.FC<Tripsclientprops> = ({
  reservations,
  currentuser,
}) => {
  const router = useRouter();
  const [deletingId, setdeletingId] = useState("");
  const oncancel = useCallback(
    (id: string) => {
      setdeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setdeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Trips"
        sub_title="Where you've been and where you are going"
      />
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 
    md:grid-cols-3 lg:grid-col-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={oncancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel Reservation"
            currentuser={currentuser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
