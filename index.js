const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const student_router = require('./routers/studentRouter')
app.use(bodyParser.json())
app.use(cors())

const databaseConnection = () => {
  mongoose
    .connect('mongodb+srv://rightclaim:rightclaim@rightclaim.v2kh4l2.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

app.use('/', student_router)
app.listen(3000, () => {
    databaseConnection()
    console.log('Server is running on port 3000')
})