/*
 * @Descripttion:主要用来管理用户信息
 * @version:
 * @Author: CoderHD
 * @Date: 2021-10-25 13:50:31
 * @LastEditors: CoderHD
 * @LastEditTime: 2021-10-25 13:58:46
 */

let mongoose = require('mongoose')

//用户对象
let schema = new mongoose.Schema({
	username: String,
	pwd: {
		type: String,
		select: false //该状态为隐藏状态
	},
	avatar: {
		type: String,
		default: ''
	},
	gender: {
		type: String,
		default: ''
	},
	description: {
		type: String,
		default: ''
	},
	phone: {
		type: String,
		default: ''
	},
	email: {
		type: String,
		default: ''
	},

})

let Users = mongoose.model('users', schema)
module.exports = { Users }


