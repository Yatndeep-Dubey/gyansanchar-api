const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const student_register_validation = require('../validations/validations')
const studentModel = require('../models/studentModel')
const helper_function = require('../helpers/helper_function')
const generate_otp = async ()=>
{
  const OTP = Math.floor(1000 + Math.random() * 9000);
  return OTP;
}

exports.register_students = async (req,res)=>
{
   const {error} = student_register_validation.student_register_validation(req.body)  
   if(error)
   {
      return res.status(400).json(error.message)
   }
   try
   {
   const exist_user = await studentModel.findOne({phone_number : req.body.phone_number})
   if(exist_user)
   {
      return res.status(200).json("User already exists")
   }
    const salt = await bcrypt.genSalt(10)
    const hashed_password = await bcrypt.hash(req.body.password,salt)
    req.body.password = hashed_password
    const otp = await generate_otp()
    req.body.otp = otp
    const student = await studentModel.create(req.body)
    res.status(200).json({otp : otp})
   }
   catch(error)
   {
      res.status(400).json(error.message)
   }  
}

exports.student_register_verify_otp = async (req,res)=>
{
   try
   {
    const student = await studentModel.findOne({phone_number : req.body.phone_number})
      if(!student)
      {
         return res.status(400).json("Student not found")
      }
      if(student.otp == req.body.otp)
      {
         const student = await studentModel.updateOne({phone_number : req.body.phone_number},{otp : null,is_verified : true})
         res.status(200).json("Student Registered Successfully")
      }
      else
      {
         res.status(400).json("Invalid OTP")
      }
   }
   catch(error)
   {
      res.status(400).json(error.message)
   }
}

exports.student_login = async (req,res)=>
{
   try
   {
      const student = await studentModel.findOne({phone_number:req.body.phone_number})
      if(student)
      {
         if(student.is_verified == false)
         {
            return res.status(400).json("Student not verified")
         }
         const valid_password = await bcrypt.compare(req.body.password,student.password)
         if(valid_password)
         {
           const token = await helper_function.createToken(student._id)
            res.status(200).json({token : token})
         }
         else
         {
            res.status(400).json("Invalid Password")
         }
      }
      else
      {
         res.status(400).json("Student not found")
      }
   }
   catch(error)
   {
      res.status(400).json(error.message)
   }
}

