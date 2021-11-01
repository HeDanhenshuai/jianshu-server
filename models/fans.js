/*
 * @Descripttion:
 * @version:
 * @Author: CoderHD
 * @Date: 2021-11-02 00:07:21
 * @LastEditors: CoderHD
 * @LastEditTime: 2021-11-02 00:08:31
 */
let mongoose = require('mongoose')

//粉丝文档对象
let schema = new mongoose.Schema({
	//当前对象
	username: String,
	author: String,
	//关注时间
	createTime: String
})

let Fans = mongoose.model('fans', schema)

module.exports = Fans