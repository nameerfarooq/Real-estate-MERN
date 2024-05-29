import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaMapMarked, FaMapMarker, FaMarker } from "react-icons/fa";
const Listing = () => {
  SwiperCore.use([Navigation]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState({});
  const { id } = useParams();
  const fetchThisListing = async () => {
    try {
      setError(false);
      setLoading(true);
      const req = await fetch(`/api/listing/getListing/${id}`);
      const data = await req.json();
      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }
      setError(false);
      setLoading(false);
      setListing(data);
      console.log(data);
    } catch (error) {
      setError(error);
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchThisListing();
  }, []);
  return (
    <main>
      {loading && (
        <p className="text-2xl font-semibold text-center my-7">Loading...</p>
      )}
      {error && (
        <p className="text-2xl text-red-700 text-center my-7">
          Something Went Wrong!
        </p>
      )}
      {!loading && !error && listing && (
        <>
          <Swiper navigation>
            {listing?.imageUrls?.map((url) => (
              <SwiperSlide key={url}>
                <img className="h-[550px] w-full object-cover " src={url} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="p-3 max-w-7xl mx-auto ">
            <div className="text-3xl font-semibold my-7">
              <span>{listing.name}</span> - $<span>{listing.regularPrice}</span>{" "}
              {listing.type === "rent" && <span>/ month</span>}
            </div>
            <div className="flex gap-2 items-center">
              <FaMapMarked color="green" />
              <span>{listing.address}</span>
            </div>
            <div className="flex gap-4 items-center my-4">
              <div className="p-1 rounded-lg  w-32 text-center  bg-red-900 text-white">
                For {listing.type}
              </div>
              {listing.offer && (
                <div className="p-1 rounded-lg  w-32 text-center  bg-green-900 text-white">
                  ${listing.discountPrice}
                </div>
              )}
            </div>
            <p className="text-slate-800 my-8">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
          </div>
        </>
      )}
    </main>
  );
};

export default Listing;
