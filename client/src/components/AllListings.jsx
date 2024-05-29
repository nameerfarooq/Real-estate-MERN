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
      if (data.success === false) {
        setError(data.message);
      }
      setListings(data);
    } catch (error) {
      setError(error.message);
      console.log("error :", error);
    }
  };
  useEffect(() => {
    fetchListings();
  }, []);
  const updateListings = async (id) => {
    setListings(listings.filter((listing) => listing._id !== id));
  };
  return (
    <div>
      <p className="text-3xl font-semibold text-center my-10">Your Listings</p>
      {error ? (
        <p>{error}</p>
      ) : listings.length > 0 ? (
        listings?.map((listing, index) => (
          <ListingItem
            key={index}
            item={listing}
            updateState={() => updateListings(listing._id)}
          />
        ))
      ) : (
        <p className="text-center my-5">No listings available</p>
      )}
    </div>
  );
};

export default AllListings;
