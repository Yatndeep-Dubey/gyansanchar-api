const { number } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({

    name :{
               type:String,
    },
    phone_number:{
        type:String
    },
    email:{
         type:String
    },
    password:{
          type:String
    },
    otp:{
        type:Number
    },
    is_verified:
    {
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
}
)

const studentModel = mongoose.model('studentModel',studentSchema)
module.exports = studentModel
