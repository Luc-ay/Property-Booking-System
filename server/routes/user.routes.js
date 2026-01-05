import express from 'express'

import {
  createUser,
  getAllUsers,
  getUserInfoById,
} from '../controllers/user.controller.js'

const router = express.Router()

router.post('/', createUser)
router.get('/:id', getUserInfoById)
router.get('/', getAllUsers)

export default router
