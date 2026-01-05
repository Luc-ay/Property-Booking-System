import User from '../mongoose/models/user.js'
import Property from './../mongoose/models/property.js'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
dotenv.config()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const getAllProperties = async (req, res) => {}

const createProperty = async (req, res) => {
  try {
    const { title, description, location, PropertyType, price, photo, email } =
      req.body

    const session = await Property.startSession()
    session.startTransaction()
    const user = await User.findOne({ email }).session(session)
    if (!user) {
      throw new Error('User not found')
    }

    const photoUrl = await cloudinary.uploader.upload(photo, {
      folder: 'property-booking',
    })

    const newProperty = await Property.create({
      title,
      description,
      location,
      PropertyType,
      price,
      photo: photoUrl.url,
      creator: user._id,
    })

    user.allProperties.push(newProperty._id)
    await user.save({ session })

    await session.commitTransaction()
    res.status(201).json(newProperty)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getPropertyDetail = async (req, res) => {}
const updateProperty = async (req, res) => {}
const deleteProperty = async (req, res) => {}

export {
  getAllProperties,
  createProperty,
  getPropertyDetail,
  updateProperty,
  deleteProperty,
}
