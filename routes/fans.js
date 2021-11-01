/*
 * @Descripttion:
 * @version:
 * @Author: CoderHD
 * @Date: 2021-11-02 00:11:27
 * @LastEditors: CoderHD
 * @LastEditTime: 2021-11-02 00:38:05
 */
let { follow, unfollow, findAll } = require('../controller/fans')
const router = require('koa-router')()
router.prefix('/fans')

//点击关注
router.post('/follow', follow)

//取消订阅
router.post('/unfollow', unfollow)

//查看所有的关注
router.get('/findAll', findAll)

module.exports = router






