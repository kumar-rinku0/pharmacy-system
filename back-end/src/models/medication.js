import { Schema, model } from "mongoose";

const medicationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  dosageInstructions: String,
  manufacturerName: String,
  manufacturerDate: Date,
  expiryDate: Date,
  maximumPurchaseLimit: Number,
  blockDurationDays: Number,
  blockedQuantity: Number,
  price: Number,
  quantity: {
    type: Number,
    default: 1,
  },
  isControlled: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: {
      values: ["active", "discontinued", "expired"],
      message: "invalid status!",
    },
    default: "active",
  },
});

const Medication = model("Medication", medicationSchema);

export default Medication;
