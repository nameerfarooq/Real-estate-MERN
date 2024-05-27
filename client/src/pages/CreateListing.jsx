import React from "react";

const CreateListing = () => {
  return (
    <main className="max-w-4xl mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            placeholder="name"
            minLength="10"
            maxLength="62"
            className="border rounded-lg p-3"
            required
          />
          <textarea
            type="text"
            id="description"
            placeholder="Description"
            className="border rounded-lg p-3"
            required
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="border rounded-lg p-3"
            required
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-4" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-4" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-4" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-4" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-4" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min={"1"}
                max={"10"}
                className="border border-gray-300 rounded-lg p-3 w-14"
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                required
                type="number"
                id="bathrooms"
                min={"1"}
                max={"10"}
                className="border border-gray-300 rounded-lg p-3 w-14"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                required
                type="number"
                id="regularPrice"
                className="border border-gray-300 rounded-lg p-3 w-24"
                min={"0"}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($/Month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                required
                type="number"
                id="discountPrice"
                className="border border-gray-300 rounded-lg p-3 w-24"
                min={"0"}
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($/Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:{" "}
            <span className="font-normal text-slate-500">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              accept="image/*"
              multiple
              className="p-3 border border-gray-300 rounded-lg w-full"
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="bg-slate-700 text-white p-3 uppercase rounded disabled:opacity-80 hover:opacity-95">
            Create Listing{" "}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
