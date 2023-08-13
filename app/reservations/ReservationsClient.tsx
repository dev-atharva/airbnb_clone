"use client";

import React, { useState, useCallback } from "react";
import { SafeReservation, SafeUser } from "../types";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface Reservationsclientprops {
  reservations: SafeReservation[];
  currentuser?: SafeUser | null;
}

const ReservationsClient: React.FC<Reservationsclientprops> = ({
  reservations,
  currentuser,
}) => {
  const router = useRouter();
  const [deletingId, setdeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setdeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Somethign went wrong");
        })
        .finally(() => {
          setdeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Reservations" sub_title="Bookings on your properties" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentuser={currentuser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
