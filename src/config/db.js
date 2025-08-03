import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DATABASE_URL);
        console.log("MONGODB connected");
    } catch (error) {
        console.log("MONGODB connection error: ", error);
        process.exit(1);
    }
}

export default connectDB;