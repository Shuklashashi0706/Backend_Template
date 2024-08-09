const express = require("express");
const connectDB = require("./data/connectDB.js");
const cookieParser = require("cookie-parser");
const router = require("./routes/user.js");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const path = require("path")

//connecting to database
connectDB();

dotenv.config({ path: ".env" });
app.use(cookieParser());
app.use(express.json({ urlencoded: true }));
app.use(cors("0.0.0.0", { credentials: true, allowedHeaders: true }));

app.use("/api/v1/user", router);

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(PORT, () => {
  console.log("Listening at port:", PORT, `with process id ${process.pid}`);
});
