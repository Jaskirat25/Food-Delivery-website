import express from "express";
import UserRouter  from "./routes/user.routes.js";
import { config } from "dotenv";
import { connectDB } from "./DB/db.js";
const app = express();

config();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); 
app.use("/user/", UserRouter);

app.get("/", (req, res) => {
  res.send("hello g");
});

connectDB()

app.listen(3000, () => {
  console.log("server started");
});
