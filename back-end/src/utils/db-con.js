import mongoose from "mongoose";

export const connectdb = (MONGO_URI) => {
  console.log("connecting to database!");
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("connection successful.");
      //   return res;
    })
    .catch((err) => {
      console.log(err);
      //   return err;
    });
};
