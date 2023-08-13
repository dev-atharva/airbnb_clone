"use client";

import React from "react";
import { SafeListing, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface Favoritesclientprops {
  listings: SafeListing[];
  currentuser?: SafeUser | null;
}

const FavoriteClient: React.FC<Favoritesclientprops> = ({
  listings,
  currentuser,
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        sub_title="List of places you have favorited!"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            currentuser={currentuser}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteClient;
