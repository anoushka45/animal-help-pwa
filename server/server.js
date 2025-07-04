const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')



dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())
const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)



// Test Route
app.get('/', (req, res) => {
  res.send('Hello from backend!')
})


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB')

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`)
  })
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err)
})
