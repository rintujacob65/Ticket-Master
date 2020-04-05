const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema
const noteSchema = new Schema({
    name:{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        validate : {
            validator : function(value){
                return validator.isEmail(value)
            },
            message : function(){
                return 'invalid email format'
            }
        }
    },
    mobile : {
        type: String,
        required :  true,
        minlength :10,
        maxlength :10

    },
    department : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'Department'
    }
})

const Employee = mongoose.model('Employee', noteSchema)
module.exports = Employee

