import express from 'express';
import cors from 'cors';
import connectDB from './db/connect.js';
import authRoute from './routes/auth.js';
import dotenv from "dotenv";

const PORT = 5000;

const app = express()
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());


app.use("/api", authRoute);

app.get("/", (req, res) => {
    res.send("Server is running")
});

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);

