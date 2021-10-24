/*
 * @Descripttion: 
 * @version: 
 * @Author: CoderHD
 * @Date: 2021-10-24 15:12:29
 * @LastEditors: CoderHD
 * @LastEditTime: 2021-10-24 23:36:08
 */
//为每个模块添加控制器
const { User } = require('../models')
const crud = require('./dbCRUD')
/*
后面我们发现在controller中，存放很多的业务逻辑，造成代码冗余
所以我们可以在controller层中抽取公共的重复代码
*/

const login = async ctx => [

]



//添加系统用户
const userAdd = async (ctx) => {
	let { username, pwd } = ctx.request.body
	console.log(username, pwd)
	await crud.add(User, { username, pwd }, ctx)
}


const userUpdate = async function (ctx) {
	let params = ctx.request.body
	await crud.update(User, { _id: params._id },
		{
			username: params.username,
			pwd: params.pwd
		}, ctx)

}

//删除用户
const userDel = async function (ctx) {
	let { _id } = ctx.request.body
	console.log(_id)
	await crud.del(User, { _id }, ctx)
}

//查询所有的用户
const userFind = async function (ctx) {
	//分页查询、模糊查询、排序查询
	await crud.find(User, null, ctx)
}

//查询单个用户
const userFindOne = async function (ctx) {
	//分页查询、模糊查询、排序查询
	await crud.findOne(User, { _id: ctx.params.id }, ctx)
}


module.exports = {
	userAdd,
	userUpdate,
	userDel,
	userFind,
	userFindOne,
	login
}