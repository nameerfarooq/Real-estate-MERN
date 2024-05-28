import React, { useEffect, useState } from "react";
import ListingItem from "./ListingItem";
import { useSelector } from "react-redux";

const AllListings = () => {
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [listings, setListings] = useState([]);
  console.log("listings : ", listings);
  const fetchListings = async () => {
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      setListings(data);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div>
      <p className="text-3xl font-semibold text-center my-10">Your Listings</p>
      {error ? (
        <p>{error}</p>
      ) : (
        listings.map((listing, index) => (
          <ListingItem key={index} item={listing} />
        ))
      )}
    </div>
  );
};

export default AllListings;
