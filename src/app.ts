import express, { json, Request, Response } from "express";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middleware/error-handler";
import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";

const app = express();
app.set("trust proxy", true);
app.use(json());

// app.use("/", (req: Request, res: Response) => {
//   res.json({ message: "Hello World!" });
// });
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
