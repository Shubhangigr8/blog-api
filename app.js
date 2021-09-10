// libraries
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const { checktoken } = require("./auth/token");
const bodyParser = require('body-parser');

// mongo connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('DATABASE: OK'))

app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes
// users
const userSchema = require('./api/users')
app.use('/api/users', userSchema)


//Posts
const postSchema = require('./api/posts')
app.use('/api/posts', checktoken, postSchema)


app.listen(process.env.PORT, () => console.log("SERVER STATUS: OK"))
