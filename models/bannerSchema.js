const e = require('express');
const mongoose = require('mongoose');
const {schema} = mongoose;


const bannerSchema = new schema({
    Image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
})

const Banner = mongoose.model('Banner', bannerSchema);
module.exports = Banner;

