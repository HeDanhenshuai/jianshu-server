/*
 * @Descripttion: 
 * @version: 
 * @Author: CoderHD
 * @Date: 2021-10-23 23:34:49
 * @LastEditors: CoderHD
 * @LastEditTime: 2021-10-25 23:03:03
 */

const router = require('koa-router')()
const { login, reg, verify, updatePwd } = require('../controller/user')
const userCtl = require('../controller/user')
router.prefix('/users')


//用户登陆
router.post('/login', login)

//用户注册
router.post('/reg', reg)


//验证用户登陆
router.post('/verify', verify)


//更新密码
router.post('/update/pwd', updatePwd)





//查看对象的属性和方法
function ShowObjProperty(Obj) {
	var attributes = '';
	var methods = '';
	for (const attr in Obj) {
		if (Obj.attr != null)
			attributes = attributes + attr + ' 属性： ' + Obj.i + '\r\n';
		else
			methods = methods + '方法: ' + attr + '\r\n';
	}
	return attributes, methods
}
let mongoose = require('mongoose')


//添加系统用户
router.post('/add', userCtl.userAdd)


//修改系统用户
router.post('/update', userCtl.userUpdate)

//删除系统用户
router.post('/del', userCtl.userDel)


//查询所有系统用户
router.get('/find', userCtl.userFind)


//查询单个系统用户
router.get('/find/:id', userCtl.userFindOne)



module.exports = router
