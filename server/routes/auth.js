const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controllers/authController')
const protect = require('../middlewares/authMiddleware')
const { OAuth2Client } = require('google-auth-library')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// ✨ Google Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// 📌 Register Route
router.post('/register', registerUser)

// 📌 Login Route
router.post('/login', loginUser)

// 🔐 Protected route example
router.get('/protected', protect, (req, res) => {
  res.status(200).json({
    message: 'This is protected data!',
    user: req.user
  })
})

// 🔐 Google Sign-In
router.post('/google', async (req, res) => {
  const { token } = req.body

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    const { email, name } = payload

    // Check if user already exists
    let user = await User.findOne({ email })

    if (!user) {
      user = new User({
        name,
        email,
        password: '' // Password not needed for Google login
      })
      await user.save()
    }

    // Issue JWT
    const jwtToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ token: jwtToken })
  } catch (error) {
    console.error('❌ Google Login Error:', error)
    res.status(401).json({ message: 'Invalid Google token' })
  }
})

module.exports = router
