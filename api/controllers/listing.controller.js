import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
export const deleteThisListing = async (req, res, next) => {
  try {
    console.log("heeeeeee");
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(201).json("Listing Deleted Successfully");
  } catch (error) {
    next(error);
  }
};
