import { Schema, model } from "mongoose";

const userPharmacySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    pharmacyId: {
      type: Schema.Types.ObjectId,
      ref: "Pharmacy",
    },
    role: {
      enum: {
        values: ["admin", "pharmasist", "customer"],
        message: "invalid role assignment!",
      },
      required: true,
    },
  },
  { timestamps: true }
);

const UserPharmacy = model("UserPharmacy", userPharmacySchema);

export default UserPharmacy;
