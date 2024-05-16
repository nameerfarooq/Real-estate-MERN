import { json } from "express";
import userModel from "../models/user.model.js";
import bycryptjs from "bcryptjs";
export const signUp = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bycryptjs.hashSync(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};
