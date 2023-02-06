import express from "express";
import { body } from "express-validator";
import { create, listProduct } from "../controllers/product";
import { validateRequest } from "../middleware/validate-request";

const router = express.Router();

router.post(
  "/",
  [
    body("uid")
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage("uid is required"),
    body("name")
      .trim()
      .isAlphanumeric("en-US", { ignore: "- " })
      .isLength({ min: 2, max: 20 }),
    body("image").isURL().withMessage("image should be in url form"),
  ],
  validateRequest,
  create
);

router.get("/", listProduct);

export { router as productRouter };
