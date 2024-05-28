import React, { useState } from "react";

const ListingItem = ({ item }) => {
  const [error, setError] = useState(null);
  const deleteMe = async () => {
    const res = await fetch(`/api/listing/delete/${item._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success === false) {
      setError(data.message);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between gap-4 flex-wrap p-3 border border-gray-200 m-2">
        <div className="flex items-center gap-2 flex-wrap">
          <img
            src={item.imageUrls[0]}
            alt=""
            className="w-20 h-20 object-cover"
          />
          <p className="text-x">{item.name}</p>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <p className="text-red-700 cursor-pointer" onClick={deleteMe}>
            Delete
          </p>
          <p className="text-green-700 cursor-pointer">Edit</p>
        </div>
      </div>
      {error && <p>{error}</p>}
    </>
  );
};

export default ListingItem;
