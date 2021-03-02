const Room = require('../models/room')
const mongoose = require('mongoose')

module.exports.createRoom = async (req, res) => {
    // const Room = mongoose.model("Room", RoomSchema);
    const room = new Room({
        number: req.body.number,
        hotelName: req.body.hotelName
    });
    try {
        const persistedRoom = await room.save();
        res.status(201).json({
            room
        })
    } catch (error) {
        res.status(400).end()
    }
}