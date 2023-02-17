const {model, Schema} = require('mongoose');

const adminAttndenceSchema = new Schema({
    timelimit: Number,
    status: String,
    createdAt: Date,
})

const adminAttndence = model('adminAttndence', adminAttndenceSchema );
module.exports = adminAttndence; 