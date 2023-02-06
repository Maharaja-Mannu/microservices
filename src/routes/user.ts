import express from "express";
import { body } from "express-validator";
import { listUser, login } from "../controllers/user";
import { validateRequest } from "../middleware/validate-request";
const router = express.Router();

router.get("/", listUser);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password", "password is required")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  login
);

export { router as userRouter };
