import User from '../mongoose/models/user.js'

const getAllUsers = async (req, res) => {}

const createUser = async (req, res) => {
  try {
    const { name, email, avatar } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) return res.status(200).json(userExists)
    const newUser = await User.create({ name, email, avatar })
    res.status(201).json(newUser)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating user', error: error.message })
  }
}

const getUserInfoById = async (req, res) => {}

export { getAllUsers, createUser, getUserInfoById }
