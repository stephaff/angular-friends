const mongoose = require('mongoose')

const validator = require('validator')

const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.signupUser = async function (email, password){
    if(!email || !password){
        throw Error('all fields must be fiiled')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('password is not strong')
    }

    const exists = await this.findOne({ email })

    if(exists){
        throw Error('Email already exist')
    }

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user

}

userSchema.statics.loginUser = async function (email, password){
    if(!email || !password){
        throw Error('all fields must be fiiled')
    }

    const user = await this.findOne({ email })

    if(!user){
        throw Error('email incorrect')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('password incorrect')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)