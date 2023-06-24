const express = require('express')
const router = express.Router()

const {
    login,
    signup
} = require('../controllers/userControllers')

// login user
router.post('/login', login)

// signup user
router.post('/signup', signup)

module.exports = router