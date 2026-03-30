import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://khaled4542065k:e3t8JEvttiIpwKUI@cluster0.jnq0rpx.mongodb.net/platform?retryWrites=true&w=majority");
        console.log("MongoDB connected");
    } catch (err) {
        console.error("DB connection error:", err);
    }
};

export default connectDB;
