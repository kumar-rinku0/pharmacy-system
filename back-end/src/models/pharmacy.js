import { Schema, model } from "mongoose";
import { randomUUID } from "crypto";

const pharmacySchema = new Schema({
  name: String,
  phone: String,
  email: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: String,
  domain: String,
  logo: String,
  owner: {
    type: String,
    required: true,
  },
  postalCode: String,
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  establistedAt: String,
  licenceKey: {
    type: String,
    required: true,
    unique: true,
    default: () => getLicenceKey(),
  },
  licenceExpiry: {
    type: Date,
    required: true,
  },
});

const Pharmacy = model("Pharmacy", pharmacySchema);

export default Pharmacy;

const getLicenceKey = () => {
  return randomUUID().split("-").join("");
};
