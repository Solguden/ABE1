const hotelService = require('../services/hotel_service');
const userService = require('../services/user_service');
const Role = require('../helpers/role');
const express = require('express');
const router = express.Router();

router.post('/:currentUserId/addHotel', createHotel)

module.exports = router;

async function createHotel(req, res, next) {
    userService.getById(req.params.currentUserId)
        .then(user => {
            if(user.role != Role.Manager){
                return res.status(401).json({message: 'Unauthorized'});
            }
            hotelService.addHotel(req.body.name, req.body.country)
            .then(hotel => res.json(hotel))
            .catch(err => next(err))
        })
}