import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_uid: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Product = mongoose.model("Product", productSchema);

export { Product };
