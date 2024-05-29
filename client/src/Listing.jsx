import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
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
        </>
      )}
    </main>
  );
};

export default Listing;
