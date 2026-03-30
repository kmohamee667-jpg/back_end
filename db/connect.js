import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://khaled-4542065:0AbURyuW30JFtlKu@mydatabase.qbmw8j0.mongodb.net/Template?retryWrites=true&w=majority");
        console.log("MongoDB connected");
    } catch (err) {
        console.error("DB connection error:", err);
    }
};

export default connectDB;
