import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongoose/connect.js'
import propertyRoutes from './routes/property.routes.js'
import userRoutes from './routes/user.routes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.get('/', (req, res) => {
  res.send('Property Booking System Server is running')
})

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/properties', propertyRoutes)

const PORT = process.env.PORT || 8080

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () =>
      console.log(`Server started on port http://localhost:${PORT}`)
    )
  } catch (error) {
    console.error('Error starting server:', error)
  }
}

startServer()
