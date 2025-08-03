import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

await connectDB();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})