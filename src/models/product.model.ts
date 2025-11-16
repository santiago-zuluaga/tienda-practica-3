import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

export const Product = model("Product", productSchema);