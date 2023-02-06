import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uid, name, image } = req.body;
    const product = new Product({
      uid,
      name,
      image,
    });
    await product.save();
    res.status(201).json({
      message: "Successfully created a product",
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const listProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();
    if (!products.length) {
      return res.json({
        message: "You have not created any product yet",
      });
    }
    res.json({
      products,
    });
  } catch (error) {
    next(error);
  }
};
