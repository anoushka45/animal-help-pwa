// controllers/authController.js
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashedPassword })
    await user.save()
    return res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

   const token = jwt.sign(
  { userId: user._id, email: user.email, name: user.name }, // ✅ include name
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
)


    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { registerUser, loginUser }
