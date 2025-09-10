import mongoose from "mongoose"

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.error("❌ Error: MONGO_URI is not defined in .env")
        process.exit(1)
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`✅ MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`❌ MongoDB connection failed: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB
