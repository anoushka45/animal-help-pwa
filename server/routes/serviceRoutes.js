const express = require('express')
const router = express.Router()
const { getNearbyServices } = require('../controllers/serviceController')

// GET /api/services/nearby
router.get('/nearby', getNearbyServices)

module.exports = router
