const mongoose = require('mongoose')

const Schema = mongoose.Schema
const noteSchema = new Schema({
    name : {
        type : String,
        required : true
    }
})

const Department = mongoose.model('Department', noteSchema)
module.exports = Department