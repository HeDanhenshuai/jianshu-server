/*
 * @Descripttion: 
 * @version: 
 * @Author: CoderHD
 * @Date: 2021-10-24 15:12:29
 * @LastEditors: CoderHD
 * @LastEditTime: 2021-10-25 23:02:40
 */
//为每个模块添加控制器
const { Users } = require('../models/users')
const crud = require('./dbCRUD')
let jwt = require('jsonwebtoken')
/*
后面我们发现在controller中，存放很多的业务逻辑，造成代码冗余
所以我们可以在controller层中抽取公共的重复代码
*/

/*用户登陆*/
const login = async ctx => {
	//模拟用户登陆
	let { username, pwd } = ctx.request.body;
	await Users.findOne({ username, pwd }).then(res => {
		if (res) {
			let token = jwt.sign({
				username: res.username,
				_id: res._id
			}, 'jianshu-server-jwt-hedan', {
				expiresIn: 3600 * 24 * 7
			})
			ctx.body = {
				code: 200,
				msg: "登陆成功",
				token
			}
		} else {
			ctx.body = {
				code: 300,
				msg: "登陆失败",
			}
		}
	}).catch(err => {
		ctx.body = {
			code: 500,
			msg: '登陆时出现异常',
			err
		}
	})
}


/*用户注册 */

const reg = async ctx => {
	let { username, pwd } = ctx.request.body
	let isDouble = false;
	await Users.findOne({ username }).then(res => {
		if (res) isDouble = true
	})
	if (isDouble) {
		ctx.body = {
			code: 300,
			msg: '用户名已经存在'
		}
		return
	}
	await Users.create({
		username, pwd
	}).then(res => {
		if (res) {
			ctx.body = {
				code: 200,
				msg: "注册成功",
			}
		} else {
			ctx.body = {
				code: 300,
				msg: "注册失败",
			}
		}
	}).catch(err => {
		ctx.body = {
			code: 500,
			msg: '注册时出现异常', err
		}
	})

}


//验证用户是否登陆的方法
const verify = async ctx => {
	let token = ctx.request.header.authorization
	token = token.replace('Bearer ', '')

	try {
		//检验token
		let result = jwt.verify(token, 'jianshu-server-jwt-hedan')
		console.log(result._id)
		await Users.findOne({ _id: result._id }).then(res => {
			if (res) {
				ctx.body = {
					code: 200,
					msg: '用户认证成功',
					user: res
				}
			} else {
				ctx.body = {
					code: 500,
					msg: '用户认证失败',
					res: res
				}
			}
		}).catch(err => {
			ctx.body = {
				code: 500,
				msg: '用户认证失败', err
			}
		})
	} catch (err) {
		ctx.body = {
			code: 500,
			msg: '用户认证失败',
			err
		}
	}
}


/*
修改用户密码 */
const updatePwd = async ctx => {
	let { username, pwd } = ctx.request.body
	await Users.updateOne({ username }, {
		pwd
	}).then(res => {
		if (res.n > 0) {
			ctx.body = {
				code: 200,
				msg: '密码修改成功'
			}
		} else {
			ctx.body = {
				code: 300,
				msg: '密码修改失败'
			}
		}
	}).catch(err => {
		ctx.body = {
			code: 500,
			msg: '修改密码时出现异常'
		}
	})
}










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
	login, reg,
	verify, updatePwd
}