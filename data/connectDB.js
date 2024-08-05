const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn) {
      console.log("Mongodb Connected");
    }
  } catch (error) {
    console.log(new Error("Mongodb error:", error));
  }
};

module.exports = connection;
