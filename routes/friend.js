const express = require('express')

const router = express.Router()

const {
    getFriends,
    getFriend,
    addFriend,
    deleteFriend,
    updateFriend
} = require('../controllers/friendControllers')

// get all friends
router.get('/', getFriends)

// get single friend
router.get('/:id', getFriend)

// add friend
router.post('/', addFriend)

// delete friend
router.delete('/:id', deleteFriend)

// update friend
router.patch('/:id', updateFriend)

module.exports = router