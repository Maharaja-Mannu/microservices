import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";
import { Password } from "../services/password";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new BadRequestError("Invalid email or password");
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) throw new BadRequestError("Invalid email or password");

    // generate jwt
    const payload = {
      id: existingUser.id,
      type: existingUser.type,
    };
    const userJwt = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res
      .cookie("jwt", userJwt, {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json(existingUser);
  } catch (error) {
    next(error);
  }
};

export const listUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.find();
  res.json({
    users,
  });
};
