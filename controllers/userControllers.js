const User = require('../models/userModel')

const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({ id }, 'hfyftdrrsrsr', { expiresIn: '3d' })
}

// login
const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.loginUser(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
     } catch (error) {
         res.status(400).json({ error: error.message })
     }

}

// sign up
const signup = async (req, res) => {
    const { email, password } = req.body

    try {
       const user = await User.signupUser(email, password)
       const token = createToken(user._id)
       res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    login,
    signup
}