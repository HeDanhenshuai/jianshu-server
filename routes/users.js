/*
 * @Descripttion: 
 * @version: 
 * @Author: CoderHD
 * @Date: 2021-10-23 23:34:49
 * @LastEditors: CoderHD
 * @LastEditTime: 2021-10-24 23:37:15
 */
const router = require('koa-router')()
const { login } = require('../controller/users')
const userCtl = require('../controller/user')
router.prefix('/users')















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
