/*
 * @Descripttion:
 * @version:
 * @Author: CoderHD
 * @Date: 2021-10-29 22:27:23
 * @LastEditors: CoderHD
 * @LastEditTime: 2021-10-29 23:45:58
 */
const router = require('koa-router')()
let {
	add,
	findAll,
	findOne,
	update,
	del
} = require('../controller/article')
router.prefix('/article')

//发布文章
router.post('/add', add)

//查询所有文章（分页）
router.get('/findAll', findAll)


//查询单个文章
router.get('/findOne', findOne)

//修改文章的接口
router.post('/update', update)

//删除文章
router.post('/delete', del)


module.exports = router