const Friend = require('../models/friendModel')
const mongoose = require('mongoose')

// get all friends
const getFriends = async (req, res) => {

    const friends = await Friend.find({}).sort({ createdAt: -1 })

    if(!friends){
        return res.status(400).json({ msg: 'friends not found' })
    }

    res.status(200).json(friends)
} 

// get single friend
const getFriend = async (req, res) => {
    
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ msg: 'Invalid id' })
    }

    const friend = await Friend.findOne({ _id: id })

    if(!friend){
        return res.status(400).json({ msg: 'Inexistant friend' })
    }

    res.status(200).json(friend)
} 

// add friend
const addFriend = async (req, res) => {
    
    const { name, phone, job } = req.body

    try {
        const friend = await Friend.create({ name, phone, job })
        res.status(200).json(friend)
    } catch (error) {
        res.status(400).json({ msg: "didn't create friend" })
    }
}

// delete friend
const deleteFriend = async (req, res) => {
    
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ msg: 'Invalid id' })
    }

    const friend = await Friend.findOneAndDelete({ _id: id })

    if(!friend){
        return res.status(400).json({ msg: 'Inexistant friend' })
    }

    res.status(200).json(friend)
}

// update friend
const updateFriend = async (req, res) => {
    
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ msg: 'Invalid id' })
    }

    const friend = await Friend.findOneAndUpdate({ _id: id}, { ...req.body })

    if(!friend){
        return res.status(400).json({ msg: 'cannot update friend' }) 
    }

    res.status(200).json(friend)
}

module.exports = {
    getFriends,
    getFriend,
    addFriend,
    deleteFriend,
    updateFriend
}