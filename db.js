import mongoose from "mongoose";

export const connection = () => {
  mongoose.connect(process.env.MONGO_URI);

  const db = mongoose.connection;

  db.once("open", () => console.log("Database connected..."));
};
