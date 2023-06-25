import mongoose from "mongoose";

export function dbConnection() {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.DB_ONLINE).then(() => {
    console.log("database connection ESTABLISHED SUCCESSFULLY!");
  }).catch((err) => {
    console.log("SORRY.. database connection FAILED!!!", err);
  });
}
// mongodb://localhost:27017