import express from "express";
import mongoose from "mongoose";
import { PORT, mongoURI } from "./config.js";
import recordRoutes from "./routes/recordRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    return res.status(234).send("Welcome");
});

app.use("/books", recordRoutes);

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`App is running at ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error);
    })
