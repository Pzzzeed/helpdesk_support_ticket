import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

async function init() {
  dotenv.config();

  //   mongoose.set("strictQuery", true);

  //   try {
  //     await mongoose.connect(process.env.DATABASE_URL);
  //     console.log("Connected to MongoDB!");
  //   } catch (error) {
  //     console.log(error);
  //   }

  const app = express();
  const port = 4000;

  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
  });
}

init();
