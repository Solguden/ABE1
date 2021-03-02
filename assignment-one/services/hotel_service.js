const HotelsColl = require('../models/hotel');
const mongoose = require('mongoose');


module.exports = {
    addHotel
};

async function addHotel(name, country) {
    const hotel = new HotelsColl({
        name: name,
        country:country
    });

    const persistedHotel = await hotel.save();

    if (!persistedHotel) {
        return;
    }
    else{
        return hotel;
    }   

}