import { Schema, model, Types } from "mongoose";

const cartSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      unique: true,
      required: true
    },
    items: [
      {
        productId: {
          type: Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ]
  },
  { versionKey: false }
);

export const Cart = model("Cart", cartSchema);