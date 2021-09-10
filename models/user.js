const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    }, 
    mobile: {
        type: String,
        require: true
    },   
}, {
    timestamps: true
})


module.exports = mongoose.model('user', userSchema)