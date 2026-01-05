import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

export default connectDB
