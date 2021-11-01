/*
 * @Descripttion:
 * @version:
 * @Author: CoderHD
 * @Date: 2021-11-01 20:54:49
 * @LastEditors: CoderHD
 * @LastEditTime: 2021-11-01 23:37:36
 */

let { add, findById, findByAuthor } = require('../controller/comment')
const router = require('koa-router')()
router.prefix('/comment')

//添加评论的接口
router.post('/add', add)

//前台根据ID来进行查询
router.get('/web/find', findById)

//后台根据author（作者）来进行查询
router.get('/admin/find', findByAuthor)

module.exports = router