/*
 * @Descripttion:
 * @version:
 * @Author: CoderHD
 * @Date: 2021-11-01 20:44:59
 * @LastEditors: CoderHD
 * @LastEditTime: 2021-11-01 22:29:08
 */
let mongoose = require('mongoose')

//文章的评论文档对象
let schema = mongoose.Schema({
	//
	username: String,
	author: String,
	articleTitle: String,
	articleId: Number,
	content: String,
	createTime: String

})

//mongoose.model第一个参数为文档对象名,另一个为该模型所包含的属性
let Comment = mongoose.model('comments', schema)

module.exports = Comment