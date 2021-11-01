/*
 * @Descripttion:
 * @version:
 * @Author: CoderHD
 * @Date: 2021-10-29 00:16:56
 * @LastEditors: CoderHD
 * @LastEditTime: 2021-11-01 22:48:29
 */
let mongoose = require('mongoose')

//文档对象模型
let schema = new mongoose.Schema({
	//定义规则
	id: Number,
	title: String,
	createTime: String,
	content: String,
	stemfrom: String,
	read: {
		type: Number,
		default: 0
	},
	star: {
		type: Number,
		default: 0
	},
	comment: {
		type: Number,
		default: 0
	},
	author: String

})
let Article = mongoose.model('articles', schema)

module.exports = Article


