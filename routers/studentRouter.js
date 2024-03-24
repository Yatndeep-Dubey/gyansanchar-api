const express = require('express')

const studentRouter = express.Router()
const studentModel = require('../models/studentModel')
const student_controller = require('./../controllers/studentController')


studentRouter.post('/student_register',student_controller.register_students )
studentRouter.post('/student_register_verify_otp',student_controller.student_register_verify_otp )
studentRouter.post('/student_login',student_controller.student_login )




module.exports = studentRouter