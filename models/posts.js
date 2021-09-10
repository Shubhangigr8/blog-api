const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const posts = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
},{
    timestamps: true
}, { strict: true })

posts.plugin(mongoosePaginate);
module.exports = mongoose.model('posts', posts)