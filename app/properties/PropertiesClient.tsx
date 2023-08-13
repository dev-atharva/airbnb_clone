"use client";

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface Propertiesclientprops {
  listings: SafeListing[];
  currentuser?: SafeUser | null;
}

const PropertiesClient: React.FC<Propertiesclientprops> = ({
  listings,
  currentuser,
}) => {
  const router = useRouter();
  const [deletingId, setdeletingId] = useState("");
  const oncancel = useCallback(
    (id: string) => {
      setdeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing Deleted");
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
      <Heading title="Properties" sub_title="List of your properties" />
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 
    md:grid-cols-3 lg:grid-col-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={oncancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete Property"
            currentuser={currentuser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
