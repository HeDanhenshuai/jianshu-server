let mongoose = require('mongoose')

//用户对象
let schema = new mongoose.Schema({
    username: String,
    pwd: {
        type: String,
        select: false
    }
})

let User = mongoose.model('users', schema)
module.exports = { User }