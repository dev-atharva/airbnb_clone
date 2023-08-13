"use client";
import Container from "@/app/components/Container";
import { categories } from "@/app/components/Navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface Listingclientprops {
  reservations?: SafeReservation[];
  listing: SafeListing & { user: SafeUser };
  currentuser?: SafeUser | null;
}

const ListingClient: React.FC<Listingclientprops> = ({
  listing,
  currentuser,
  reservations = [],
}) => {
  const loginmodel = useLoginModal();
  const router = useRouter();
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const [isloading, setisloading] = useState(false);
  const [totalPrice, settotalprice] = useState(listing.price);
  const [daterange, setdaterange] = useState<Range>(initialDateRange);

  const oncreatereservation = useCallback(() => {
    if (!currentuser) {
      return loginmodel.onOpen();
    }
    setisloading(true);
    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: daterange.startDate,
        endDate: daterange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved !");
        setdaterange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setisloading(false);
      });
  }, [loginmodel, listing?.id, router, totalPrice, currentuser, daterange]);

  useEffect(() => {
    if (daterange.startDate && daterange.endDate) {
      const daycount = differenceInCalendarDays(
        daterange.endDate,
        daterange.startDate
      );
      if (daycount && listing.price) {
        settotalprice(daycount * listing.price);
      } else {
        settotalprice(listing.price);
      }
    }
  }, [daterange, listing.price]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6 ">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentuser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              guestCount={listing.guestCount}
              locationvalue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setdaterange(value)}
                dateRange={daterange}
                onSubmit={oncreatereservation}
                disabled={isloading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
